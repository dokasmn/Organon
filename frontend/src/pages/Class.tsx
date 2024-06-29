// REACT
import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';

// COMPONENTS
import ButtonBigMobile from '../components/items/buttons/ButtonBigMobile';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';
import ArrowSlider from '../components/items/cards/ArrowSlider.tsx';
import Video from '../components/items/mediaComponents/Video.tsx';
import CommentInput from '../components/items/inputs/CommentInput.tsx';
import Button from '../components/items/buttons/Button.tsx';
import Link from '../components/items/buttons/Link.tsx';

// IMAGES
import { MdArrowRight, MdArrowLeft } from "react-icons/md";
import makeNotes from '../assets/images/make-notes.png';
import makeNotesBig from '../assets/images/make-notes-big.png';
import Comment from '../components/items/section/Comment.tsx';
import profilePicture from '../assets/images/profile-picture/profile-picture-2.png'

const Class:React.FC = () => {
    const location: string[] = useLocation().pathname.split("/");
    const prevUrl = "/" + location[1] + "/" + location[2]
    console.log(prevUrl)  

    const [commentData, setCommentData] = useState<{[key: string]:string}>({});

    const titleClass:string = "Aula Sobre Logarítmo";
    const teacher: string  = "Professor X"
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

    return (
        <div className='w-full xs:px-5 sm:flex flex-col items-center '>  
            <header className='h-14 w-full flex max-w-160 lg:max-w-4xl' >
                <Link style='flex cursor-pointer hover:text-blue-1' text={
                    <>
                        <section className='relative h-full' >
                        <ArrowSlider icon={<MdArrowLeft className='text-3xl' />} style="left-0 xs:-left-2  top-8" />
                        </section>
                        <p className='h-full flex items-center pl-10'>Voltar para a matéria</p>
                    </>
                } to={prevUrl} />
       
                
                
            </header>
            <main className='pt-0 max-w-160 lg:max-w-4xl' >
                <section className='' >
                    <Video path="" />
                </section>
                <section className='px-1 xs:px-0 py-5' >
                    <div className='flex items-center justify-between px-2 xs:px-0 pt-3 ' >
                        <h2 className='text-lg md:text-xl lg:text-2xl font-semibold' >
                            {titleClass}
                        </h2>
                        
                        <div className='p-2 border border-gray-1 rounded-sm hover:bg-blue-100 cursor-pointer' >
                            <img src={makeNotes} alt="" className=' h-4 md:hidden' />
                            <img src={makeNotesBig} alt="" className=' hidden md:block h-7' />
                        </div>
                    </div>
                    <div className='px-2 opacity-80 xs:px-0 ' >
                        <p>
                            {teacher}
                        </p>
                    </div>
                    <div className='w-full h-5 flex justify-between py-5' >
                        <section className='relative px-7 xs:px-5 hover:text-blue-1 cursor-pointer' >
                            <ArrowSlider icon={<MdArrowLeft className='text-3xl' />} style=" left-0 xs:-left-2 top-4 "/>
                            <p>Anterior</p>
                        </section>
                        <div className=' relative px-7 xs:px-5 hover:text-blue-1 cursor-pointer' >
                            <p>Próximo</p>
                            <ArrowSlider icon={<MdArrowRight className='text-3xl' />} style=" right-0 xs:-right-2 top-4"/>
                        </div>
                    </div>
                </section>
                <HorizontalLine style='w-full ' />  
                <section className='px-5 py-5 flex flex-col items-center sm:px-7' >
                    <p className='pb-10'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima fuga, dicta voluptas deleniti officiis necessitatibus exercitationem saepe nam et nobis. Reiciendis doloribus et sint pariatur esse nostrum, veritatis aut animi. Accusamus et iure iste, voluptate omnis sapiente laborum modi ullam fugit. Iusto, nostrum nisi.
                    </p>
                    <Button 
                        text='Book PDF' 
                        style='bg-orange-1 hover:bg-orange-1-dark max-w-160' 
                    />
                </section>
                <HorizontalLine style='w-full ' />  
                <section className='px-5 sm:px-7 py-5' >
                    <h2 className=' font-semibold text-lg ' >Comments</h2>
                    
                    <section className='pt-10'>
                        {
                            comments.map((comment, __) => (
                                <Comment 
                                    userName={comment.nameProfile} 
                                    photoPerfil={comment.imageProfile}
                                    comment={comment.commentText}
                                />
                            ))
                        }
                    </section>
                </section>
                <HorizontalLine style='w-full' />
                <section className='px-5 pt-5 sm:px-7 pb-5 md:flex justify-center' >
                    <CommentInput 
                        id={"commentImput"} 
                        value={commentData.user_id || ""} 
                        onChange={handleChange} 
                        name={"user_id"}
                    />
                </section>
                
            </main>
        </div>
    )
}

export default Class;