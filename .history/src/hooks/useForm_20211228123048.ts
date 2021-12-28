import React from 'react';

function useForm<T>(
  data: T,
): [T, (key: string, value: string) => void, React.Dispatch<React.SetStateAction<T>>] {
  const [form, setForm] = React.useState(data);

  const updateForm = (key: string, value: string): void => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  return [form, updateForm, setForm];
}

export default useForm;
