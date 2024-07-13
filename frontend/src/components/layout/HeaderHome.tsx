import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import flagBrasilDesktop from '../../assets/images/flag_brasil_desktop.png';
import flagSantaCatarinaDesktop from '../../assets/images/flag_santa_catarina_desktop.png';
import axiosInstance from '../../axiosConfig';
import InputSearch from '../items/inputs/InputSearch';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderHomeProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const HeaderHome: React.FC<HeaderHomeProps> = ({ searchQuery, setSearchQuery }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [allContents, setAllContents] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await axiosInstance.get('course/content/', {
                    headers: {
                        'Authorization': `Token ${user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data.results)
                setAllContents(response.data.results.content_name,response.data.content_subject);
            } catch (error) {
                console.error('Erro ao buscar conteúdos:', error);
            }
        };

        fetchContents();
    }, [user.token]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query && Array.isArray(allContents)) {
            const filteredSuggestions = allContents.filter(content =>
                content.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSearchSubmit = () => {
        if (searchQuery) {
            navigate(`/materia/${subject}/${searchQuery}`);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    return (
        <>
            <header className='hidden h-16 items-center text-white md:flex my-1 w-full max-w-7xl'>
                <div className='w-2/12'>
                    <img src={flagSantaCatarinaDesktop} alt="" className='w-16' />
                </div>

                <div className='w-8/12 flex justify-center'>
                    <InputSearch 
                        id="search-content" 
                        placeholder="Pesquisar" 
                        value={searchQuery} 
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                    />
                    {suggestions.length > 0 && (
                        <div className='absolute bg-white shadow-md w-full mt-2 rounded'>
                            {suggestions.map((suggestion, index) => (
                                <div key={index} className='p-2 border-b cursor-pointer' onClick={() => {
                                    setSearchQuery(suggestion);
                                    handleSearchSubmit();
                                }}>
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='w-2/12 flex justify-end'>
                    <img src={flagBrasilDesktop} alt="" className='w-16' />
                </div>
            </header>
        </>
    );
}

export default HeaderHome;
