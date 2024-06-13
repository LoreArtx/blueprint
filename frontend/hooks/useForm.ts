import { useState } from 'react';

const useForm = <T extends object>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

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
