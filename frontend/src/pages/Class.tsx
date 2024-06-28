// REACT
import React, {useState} from 'react';

// COMPONENTS
import ButtonBigMobile from '../components/items/buttons/ButtonBigMobile';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';
import ArrowSlider from '../components/items/cards/ArrowSlider.tsx';
import Video from '../components/items/mediaComponents/Video.tsx';
import CommentInput from '../components/items/inputs/CommentInput.tsx';
import Button from '../components/items/buttons/Button.tsx';

// IMAGES
import { MdArrowRight, MdArrowLeft } from "react-icons/md";
import makeNotes from '../assets/images/make-notes.png';
import Comment from '../components/items/section/Comment.tsx';
import profilePicture from '../assets/images/profile-picture/profile-picture-2.png'

const Class:React.FC = () => {

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
        <>  
            <header className='h-14 flex items-center sm:px-3 ' >
                <section className='relative h-full px-4' >
                    <ArrowSlider icon={<MdArrowLeft className='text-3xl' />} style="left-0 top-8" />
                </section>
                <p>Voltar para a matéria</p>
            </header>
            <main className='pt-0 pb-0' >
                <section className='sm:px-5' >
                    <Video path="" />
                </section>
                <section className='px-1' >
                    <div className='flex items-center justify-between px-2 pt-3 sm:px-5 ' >
                        <h2 className='text-lg font-semibold   ' >
                            {titleClass}
                        </h2>
                        
                        <div className='p-2 border border-gray-1 rounded-sm hover:bg-blue-100 ' >
                            <img src={makeNotes} alt="" className=' h-4 ' />
                        </div>
                    </div>
                    <div className='px-2 opacity-80 sm:px-5 ' >
                        <p>
                            {teacher}
                        </p>
                    </div>
                    <div className='w-full h-5 flex justify-between py-5 sm:px-3' >
                        <section className='relative px-7 ' >
                            <ArrowSlider icon={<MdArrowLeft className='text-3xl' />} style="left-0 top-4" />
                            <p>Anterior</p>
                        </section>
                        <div className=' relative px-7 ' >
                            <p>Próximo</p>
                            <ArrowSlider icon={<MdArrowRight className='text-3xl' />} style="right-0 top-4" />
                        </div>
                    </div>
                </section>
                <HorizontalLine style='w-full ' />  
                <section className='px-5 text-justify sm:px-7' >
                    <p className='pb-5'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima fuga, dicta voluptas deleniti officiis necessitatibus exercitationem saepe nam et nobis. Reiciendis doloribus et sint pariatur esse nostrum, veritatis aut animi. Accusamus et iure iste, voluptate omnis sapiente laborum modi ullam fugit. Iusto, nostrum nisi.
                    </p>
                    <Button 
                        text='Book PDF' 
                        style='bg-orange-1 hover:bg-orange-1-dark' 
                    />
                </section>
                <HorizontalLine style='w-full ' />  
                <section className='px-5 sm:px-7' >
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
                <HorizontalLine style='w-full ' />
                <section className='px-5 sm:px-7 pb-5' >
                    <CommentInput 
                        id={"commentImput"} 
                        value={commentData.user_id || ""} 
                        onChange={handleChange} 
                        name={"user_id"}
                    />
                </section>
                
            </main>
        </>
    )
}

export default Class;