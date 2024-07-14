// REACT
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// IMAGES
import flagBrasilDesktop from '../../assets/images/flag_brasil_desktop.png';
import flagSantaCatarinaDesktop from '../../assets/images/flag_santa_catarina_desktop.png';

// AXIOS
import axiosInstance from '../../axiosConfig';

// COMPONENTES
import InputSearch from '../items/inputs/InputSearch';

// HOOKS
import { useAuth } from '../../contexts/AuthContext';
import useRequests from '../../hooks/useRequests';

interface HeaderHomeProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

interface Content {
    [key: string]: string;
}

const HeaderHome: React.FC<HeaderHomeProps> = ({ searchQuery, setSearchQuery }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { showError, showUnespectedResponse, headersToken } = useRequests();
    const [allContents, setAllContents] = useState<Content>({});
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await axiosInstance.get('course/content/', {
                    headers: headersToken,
                });
                if (Array.isArray(response.data.results)) {
                    const contents = response.data.results.reduce((acc: Content, content: any) => {
                        acc[content.content_name] = content.content_subject;
                        return acc;
                    }, {});
                    setAllContents(contents);
                } else {
                    showUnespectedResponse(response);
                }
            } catch (error: any) {
                showError(error);
            }
        };

        fetchContents();
    }, [user.token]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query && Object.keys(allContents).length > 0) {
            const filteredSuggestions = Object.keys(allContents).filter(contentName =>
                contentName.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSearchSubmit = () => {
        if (searchQuery && allContents[searchQuery]) {
            navigate(`/materia/${allContents[searchQuery]}/${searchQuery}`);
        }
    };

    // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === 'Enter') {
    //         handleSearchSubmit();
    //     }
    // };

    const handleSubmitQuery = (value: string) => {
        setSearchQuery(value);
        handleSearchSubmit();
    }

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
                        list={suggestions}
                        handleSearchSubmit={handleSubmitQuery}
                        style='focus:border-blue-1 bg-white text-sm'
                        icon={true}
                    />
                </div>
                <div className='w-2/12 flex justify-end'>
                    <img src={flagBrasilDesktop} alt="" className='w-16' />
                </div>
            </header>
        </>
    );
}

export default HeaderHome;


