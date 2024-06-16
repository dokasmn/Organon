import { useState } from 'react';

const useForm = <T extends Record<string, any>>(initialState: T, onSubmit: (data: T) => void) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData(initialState); // Limpar os campos após o envio do formulário
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
