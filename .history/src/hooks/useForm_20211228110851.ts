import React from 'react';

function useForm<T>(
  data: T,
): [T, (key: string, value: string) => void] {
  const [form, setForm] = React.useState(data);

  const updateForm = (key: string, value: string): void => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  return [form, updateForm];
}

export default useForm;
