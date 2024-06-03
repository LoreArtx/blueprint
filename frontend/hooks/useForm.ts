import { useState, useEffect } from 'react';

const useForm = <T extends object>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
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
