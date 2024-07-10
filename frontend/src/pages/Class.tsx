// REACT
import React, { useState, useEffect,  } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// COMPONENTS
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';
import ArrowSlider from '../components/items/cards/ArrowSlider.tsx';
import Video from '../components/items/mediaComponents/Video.tsx';
import CommentInput from '../components/items/inputs/CommentInput.tsx';
import Button from '../components/items/buttons/Button.tsx';
import Link from '../components/items/buttons/Link.tsx';
import PopUpCreateNote from '../components/popups/PopUpCreateNote.tsx';

// IMAGES
import { MdArrowRight, MdArrowLeft } from "react-icons/md";
import makeNotes from '../assets/images/make-notes.png';
import makeNotesBig from '../assets/images/make-notes-big.png';
import Comment from '../components/items/section/Comment.tsx';
import profilePicture from '../assets/images/profile-picture/profile-picture-2.png'

// HOOKS
import { useLoading } from '../contexts/LoadingContext.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { usePopupLog } from '../contexts/PopUpLogContext.tsx';

// AXIOS
import axiosInstance from '../axiosConfig.ts';

// UTILS
import { getRoute, decodeStringUrl } from '../utils.ts';

const Class:React.FC = () => {    
    const location: string[] = useLocation().pathname.split("/");
    const prevUrl = "/" + location[1] + "/" + location[2];
    
    const route: string[] = getRoute();
    const content: string = route[route.length-1];
    
    const decodecontent = decodeStringUrl(content);

    const [showCreateNotePopup, setShowCreateNotePopup] = useState<boolean>(false);
    const { setShowLoading } = useLoading();
    const { handleShowError } = usePopupLog();
    const { user } = useAuth();
    const [commentData, setCommentData] = useState<{[key: string]:string}>({});
    const [contentData, setContentData] = useState(
        {
            content_description: "",
            content_name: "",
            content_pdf: "",
            content_professor_user: "",
            content_subject: "",
            content_video: ""
        }
    )

    const comments: {imageProfile:string, nameProfile:string, commentText:string}[] = [
        {
            imageProfile:profilePicture, 
            nameProfile:"Daniel Lima", 
            commentText:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, recusandae beatae necessitatibus placeat a et ad reprehenderit"
        },
        {
            imageProfile:profilePicture, 
            nameProfile:"Daniel Lima", 
            commentText:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, recusandae beatae necessitatibus placeat a et ad reprehenderit"
        },
        {
            imageProfile:profilePicture, 
            nameProfile:"Daniel Lima", 
            commentText:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, recusandae beatae necessitatibus placeat a et ad reprehenderit"
        }
    ]

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCommentData({
          ...commentData,
          [name]: value,
        });
    };

    useEffect(() => {
        if(user.token){
            fetchData();
        }
    }, [user])

    const fetchData = async () => {
        setShowLoading(true);
        try {
            const response = await axiosInstance.get(`home/content/?content_name=${decodecontent}`, {
                headers: {
                    'Authorization': `Token ${user.token}`,
                },
            })
            setShowLoading(false);
            if (response.status === 200) {
                setContentData(response.data.results[0])
                console.log(response.data.results)
            }else{
                handleShowError("Resposta inesperada.")
                console.error('Unexpected response status:', response.status);
            }
        } catch (error: any) {
            setShowLoading(false);
            if(error.response.data && error.response.data.detail){    
                handleShowError(error.response.data.detail)
            }else{
                handleShowError(error.message)
            }
            console.error('Error:', error.message);
        }
    }

    return (
        <>
            {showCreateNotePopup && (
                <PopUpCreateNote 
                    noteContent={contentData.content_name}
                />
            )}        
            <div className='w-full sm:flex flex-col items-center '>  
                <header className='h-14 w-full flex max-w-160 lg:max-w-4xl relative md:my-5 md:bg-white rounded md:rounded-none overflow-hidden py-5 md:shadow-md md:border border-black border-opacity-30' >
                    <Link style='flex cursor-pointer hover:text-blue-1' text={
                        <>
                            <section className='relative h-full' >
                                <ArrowSlider icon={<MdArrowLeft className='text-3xl md:text-2xl' />} style="left-0 md:left-5 sm:bg-gray-300 sm:p-1 flex items-center rounded-full hover:bg-gray-400" />
                            </section>
                            <p className='h-full flex items-center pl-10 md:pl-16'>Voltar para a matéria</p>
                        </>
                    } to={prevUrl} />
                </header>
                <main className='pt-0 w-full max-w-160 lg:max-w-4xl' >
                    <section>
                        <Video path={contentData.content_video} />
                    </section>
                    <section className=' px-1 bs:px-0' >
                        <div className='flex items-start justify-between px-2 bs:px-0 pt-3 ' >
                            <div>
                                <h2 className='text-lg md:text-xl lg:text-2xl font-semibold' >
                                    {contentData.content_name}
                                </h2>
                                <p>
                                    {contentData.content_professor_user}
                                </p>
                            </div>
                            
                            <div className='p-2 border border-white-2-dark rounded-sm md:roundend-none hover:bg-white-2 cursor-pointer' >
                                <img src={makeNotes} alt="" className=' h-4 md:hidden' onClick={() => {setShowCreateNotePopup(true)}} />
                                <img src={makeNotesBig} alt="" className=' hidden md:block h-6' onClick={() => {setShowCreateNotePopup(true)}} />
                            </div>
                        </div>
                        <div className='w-full h-8 flex items-center justify-between my-7' >
                            <div className='relative px-7 bs:px-5 flex items-center h-full hover:text-blue-1 cursor-pointer' >
                                <ArrowSlider icon={<MdArrowLeft className='text-3xl md:text-2xl'/>} style="left-0 top-4 md:bg-gray-300 md:p-1 flex items-center rounded-full md:hover:bg-gray-400"/>
                                <p className='md:pl-10'>Anterior</p>
                            </div>
                            <div className=' relative px-7 bs:px-5 flex items-center h-full hover:text-blue-1 cursor-pointer' >
                                <p className='md:pr-10' >Próximo</p>
                                <ArrowSlider icon={<MdArrowRight className='text-3xl md:text-2xl'/>} style="right-0 top-4 md:bg-gray-300 md:p-1 flex items-center rounded-full md:hover:bg-gray-400"/>
                            </div>
                        </div>
                    </section>
                    <HorizontalLine style='w-full md:hidden'/>  
                    <section className='px-3 mb-5 flex flex-col md:border border-gray-1 md:bg-white md:p-5 justify-between'>
                        <div>
                            <h2 className=' font-semibold text-lg w-full pb-5'>Descrição:</h2>
                            <p className='pb-5 w-full  '>
                                {contentData.content_description}
                            </p>
                        </div>
                        <div className='flex md:block flex-col items-center'>
                            <h2 className=' font-semibold text-lg w-full pb-5'>Conteúdo do livro em PDF:</h2>
                            <Button 
                                text='Download' 
                                style='bg-orange-1 hover:bg-orange-1-dark max-w-104 md:max-w-44' 
                            />
                        </div>    
                    </section>
                    <HorizontalLine style='w-full md:hidden ' />  
                    <section className='px-3 bs:px-0' >
                        <h2 className=' font-semibold text-lg  '>Comentários:</h2>
                        
                        <section className='pt-5'>
                            {
                                comments.map((comment, __) => (
                                    <Comment 
                                        key={uuidv4()}
                                        userName={comment.nameProfile} 
                                        photoPerfil={comment.imageProfile}
                                        comment={comment.commentText}
                                    />
                                ))
                            }
                        </section>
                    </section>
                    <section className='px-3 pt-5 pb-5 md:flex justify-center' >
                        <CommentInput 
                            id={"commentImput"} 
                            value={commentData.user_id || ""} 
                            onChange={handleChange} 
                            name={"user_id"}
                        />
                    </section>
                    
                </main>
            </div>
        </>
    )
}

export default Class;