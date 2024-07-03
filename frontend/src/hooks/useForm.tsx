import { useState } from 'react';

const useForm = <T extends Record<string,any>>(initialState: T, onSubmit: (data: T) => void) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value  = event.target.value;
    const name = event.target.name;
    setFormData({   
      ...formData,
      [name]: value, 
    });
  };

  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    
    setFormData({
      ...formData,  
      [name] : value,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]:  files && files[0] ? files[0]  : value,
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
    handleChangeSelect,
    handleChangeTextArea,
  };
};

export default useForm;
