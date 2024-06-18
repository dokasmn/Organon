import React from 'react';

// COMPONENTS
import Title from '../components/items/texts/Title';
import InputDark from '../components/items/inputs/Input';
import ButtonBigMobile from '../components/items/buttons/ButtonBigMobile';
import Link from '../components/items/buttons/Link';
import { useNavigate } from 'react-router-dom';

// HOOKS
import useForm from '../hooks/useForm';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const { formData, handleChange, handleSubmit } = useForm(
        { name: '', email: '', password: '', confirmPassword: '' },
        (data) => {
            console.log(data);
            // A requisição vai aqui
            navigate('/login');
        }
    );

    return (
        <main className={'bg-gradient-blue-bottom h-screen px-7 flex items-center pb-0'}>
            <form className='w-full text-white' onSubmit={handleSubmit}>
                <Title color="white" text="BEM VINDO!" />
                <section>
                    <div className='pb-7'>
                        <InputDark
                            placeholder="Nome"
                            name="name"
                            type="text"
                            id="name-input"
                            value={formData.name}
                            title="Digite um nome válido."
                            required={true}
                            onChange={handleChange}
                            maxLength={80}
                            minLength={2}
                        />
                        <InputDark
                            placeholder="E-mail"
                            name="email"
                            type="text"
                            id="email-input"
                            value={formData.email}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            title="Digite um email válido."
                            required={true}
                            onChange={handleChange}
                            maxLength={254}
                        />
                        <InputDark
                            placeholder="Senha"
                            name="password"
                            type="password"
                            id="password-input"
                            value={formData.password}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                            title="A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
                            required={true}
                            onChange={handleChange}
                            maxLength={64}
                            minLength={8}
                        />
                        <InputDark
                            placeholder="Confirmar senha"
                            name="confirmPassword"
                            type="password"
                            id="confirmPassword-input"
                            value={formData.confirmPassword}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                            title="A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
                            required={true}
                            onChange={handleChange}
                            maxLength={64}
                            minLength={8}
                        />
                    </div>
                </section>
                <ButtonBigMobile type="submit" text="Registrar" backgroundColor='blue-3' textColor='white' hover="blue-4-dark" />
                <p className='pt-7'>Possui uma conta? <Link to="/login" text="Logar" style="text-blue-1 hover:text-blue-1-dark" /></p>
            </form>
        </main>
    );
};

export default Register;
