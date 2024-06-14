import { useState } from 'react';

const useForm = <T extends object>(initialValues: T) => {
   const [values, setValues] = useState(() => {
    const formattedValues = { ...initialValues };
    if (formattedValues.deadline) {
      formattedValues.deadline = new Date(formattedValues.deadline).toISOString().split('T')[0];
    }
    return formattedValues;
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const setFormValues = (newValues: Partial<T>) => {
    setValues({
      ...values,
      ...newValues,
    });
  };

  return {
    values,
    handleChange,
    setFormValues,
  };
};

export default useForm;
