// REACT
import { useState } from 'react';

// HOOKS

const useForm = <T extends Record<string, any>>(initialState: T, onSubmit: (data: T) => void) => {
    const [formData, setFormData] = useState<T>(initialState);

    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];

      if (file) {
          setFormData({
              ...formData,
              [event.target.id]: file,
          });
      }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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
        handleChangeSelect,
        handleFileChange,
    };
};

export default useForm;
