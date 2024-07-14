// REACT
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
import TitleSection from '../components/layout/TitleSection';
import HorizontalLine from '../components/items/texts/HorizontalLine';
import BottomNavigationBar from '../components/layout/BottomNavigationBar';
import TopNavigationBar from '../components/layout/TopNavigationBar';
import Button from '../components/items/buttons/Button';
import InputIcon from '../components/items/inputs/InputIcon';
import InputSearch from '../components/items/inputs/InputSearch';

// HOOKS
import { usePopupLog } from '../contexts/PopUpLogContext';
import { useLoading } from '../contexts/LoadingContext';
import useForm from '../hooks/useForm';
import { useAuth } from '../contexts/AuthContext';
import useRequests from '../hooks/useRequests';

// IMAGES
import { FiBookOpen } from "react-icons/fi";
import { IoPricetagOutline, IoMailOutline, IoSchoolOutline, IoRibbonOutline, IoBusinessOutline  } from "react-icons/io5";
import { PiPasswordLight } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";

// UTILS
import { professions } from '../utils';

interface teacherFormInterface {
    nameTeacher: string,
    emailTeacher: string,
    passwordTeacher: string,
    confirmPasswordTeacher: string,
    courseTraining: string,
    degreeTraining: string,
    companyJob: string,
}

const AddTeacher:React.FC = () => {
    const { setShowLoading } = useLoading();
    const { handleShowSuccess } = usePopupLog();
    const { showError, showUnespectedResponse, headersJsonToken } = useRequests();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const { formData, handleChangeSelect , handleSubmit, handleChange} = useForm(
        { 
            nameTeacher: '',
            emailTeacher: '',
            passwordTeacher: '',
            confirmPasswordTeacher: '',
            courseTraining: '',
            degreeTraining: '',
            companyJob: '',
        },
        (data) => {
            fetchData(data);
        }
    );
    const degreeTrainingList = ["Doutorado", "Mestrado", "Graduação", "Ensino técnico"];

    

    const fetchData = async (data: teacherFormInterface) => {
        setShowLoading(true);
        
        try {
            const response = await axiosInstance.post('home/content/', 
            {
                
            }, {
                headers: headersJsonToken,
            });
            setShowLoading(false);
            if (response.status === 201) {
                handleShowSuccess("Conteúdo criado com sucesso")
            }else{
                showUnespectedResponse(response);
            }
        } catch (error: any) {
            showError(error);
        }
    };


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query && Object.keys(professions).length > 0) {
            const filteredSuggestions = Object.keys(professions).filter(contentName =>
                contentName.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSubmitQuery = (value: string) => {
        setSearchQuery(value)
        setSuggestions([]);
    }
    
    return (      
        <div className="sm:flex justify-center">
            <TopNavigationBar/>
            <div>
                <main className="xs:px-14 md:pt-40 md:px-10 max-w-160 sm:min-w-160" >
                    <section className='px-5 xs:px-0 md:px-0 mb-5 md:mb-0'>
                        <TitleSection title="CONTENTS" />
                    </section>
                    <section className='bg-white-2 px-5 py-10 md:shadow-md' >
                        <h3 className=' font-bold text-xl mb-2'>Adicionar Professor</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.!</p>
                    </section>
                    <form className='w-full p-5 xs:px-0 sm:px-0 md:px-0 flex flex-col' onSubmit={handleSubmit} >
                        <div className='w-full' >
                            <label htmlFor="name-teacher" className='block font-semibold mb-5'>Nome:</label>
                            <InputIcon 
                                onChange={handleChange}
                                value={formData.nameTeacher}
                                type='text' 
                                id='name-teacher' 
                                placeholder='Inserir nome do professor' 
                                name='nameTeacher'
                                style='h-full border-none bg-white'
                                icon={IoPricetagOutline}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-teacher" className='block font-semibold mb-5'>Email:</label>
                            <InputIcon 
                                onChange={handleChange}
                                value={formData.emailTeacher}
                                type='email' 
                                id='email-teacher' 
                                placeholder='Inserir email do professor' 
                                name='emailTeacher'
                                style='h-full border-none bg-white'
                                icon={IoMailOutline}
                            />
                        </div>
                        <div className='sm:flex justify-between'>
                            <div className='w-full sm:mb-0 sm:w-6/12 sm:mr-2' >
                                <label htmlFor="password-teacher" className='block font-semibold mb-5'>Senha:</label>
                                <InputIcon 
                                    onChange={handleChange}
                                    value={formData.passwordTeacher}
                                    type='password' 
                                    id='password-teacher' 
                                    placeholder='Inserir senha' 
                                    name='passwordTeacher'
                                    style='h-full border-none bg-white'
                                    icon={PiPasswordLight}
                                />
                            </div>
                            <div className='w-full sm:w-6/12 sm:ml-2'>
                                <label htmlFor="confirm-password-teacher" className='block font-semibold mb-5'>Confirmar Senha:</label>
                                <InputIcon 
                                    onChange={handleChange}
                                    value={formData.confirmPasswordTeacher}
                                    type='password' 
                                    id='confirm-password-teacher' 
                                    placeholder='Confirmar senha' 
                                    name='confirmPasswordTeacher'
                                    style='h-full border-none bg-white'
                                    icon={RiLockPasswordLine}
                                />
                            </div>
                        </div>
                        <div className='sm:flex justify-between'>
                            <div className='w-full mb-5 sm:mb-0 sm:w-8/12 sm:mr-2  '>
                                <label htmlFor="course-training" className='block font-semibold mb-5'>Curso:</label>
                                <InputIcon 
                                    onChange={handleChange}
                                    value={formData.courseTraining}
                                    type='text' 
                                    id='course-training' 
                                    placeholder='Inserir curso de formação' 
                                    name='courseTraining'
                                    style='h-full border-none bg-white'
                                    icon={IoSchoolOutline}
                                />
                            </div>
                            <div className='w-full sm:w-4/12 sm:ml-2'>
                                <label htmlFor="degree-training" className='block font-semibold mb-5'>Grau:</label>
                                <label htmlFor="degree-training" className='border border-gray-1 md:rounded-none flex h-10'>
                                    <div className='bg-white-2 h-full w-10 min-w-8 rounded flex justify-center items-center' >
                                        <IoRibbonOutline/>
                                    </div>
                                    <select 
                                        name="degreeTraining" 
                                        onChange={handleChangeSelect} 
                                        value={formData.degreeTraining} 
                                        id="degree-training" 
                                        className='p-0.5 px-3 bg-white rounded w-full outline-none'
                                    >
                                        {degreeTrainingList.map((degree) => (
                                            <option 
                                                key={uuidv4()}
                                                value={degree}
                                            >
                                                {degree}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div className='sm:flex justify-between mb-5' >
                            <div className='w-full sm:mb-0 sm:w-6/12 sm:mr-2' >
                                <label htmlFor="company-job" className='block font-semibold mb-5'>Empresa:</label>
                                <InputIcon
                                    onChange={handleChange}
                                    value={formData.companyJob}
                                    type='text' 
                                    id='company-job' 
                                    placeholder='Informar empresa' 
                                    name='companyJob'
                                    style='h-full border-none bg-white'
                                    icon={IoBusinessOutline}
                                />
                            </div>
                            <div className='w-full sm:w-6/12 sm:ml-2'>
                                <label htmlFor="responsibility-job" className='block font-semibold mb-5'>Cargo:</label>
                                <InputSearch 
                                    id="search-content" 
                                    placeholder="Informar cargo" 
                                    value={searchQuery} 
                                    onChange={handleSearchChange}
                                    list={suggestions}
                                    handleSearchSubmit={handleSubmitQuery}
                                />
                            </div>
                        </div>
                        <HorizontalLine style='w-full mb-5'/>
                        <div >
                            <Button 
                                text='Salvar' 
                                type='submit'
                                style='mb-5 bg-blue-5 hover:bg-blue-5-dark'
                            />
                            <Button 
                                text='Cancelar' 
                                style='bg-white-2-dark hover:bg-gray-1 ' 
                            />
                        </div>
                    </form>
                </main>
                <BottomNavigationBar/>
            </div>
        </div> 
    )
}

export default AddTeacher;