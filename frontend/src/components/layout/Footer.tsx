//REACT
import React from 'react';

//IMAGES
import flagBrasil from "../../assets/images/flag_brasil.png"
import logo from "../../assets/images/logo.png"
import { AiOutlineInstagram } from "react-icons/ai";
import { CiTwitter, CiFacebook } from "react-icons/ci";

//COMPONENTS
import SectionFooter from '../items/section/SectionFooter';

const Footer:React.FC = () => {
    return (
        <footer className='bg-white md:border border-black border-opacity-30 p-7 pt-16 sm:px-16 md:mb-5 xl:flex justify-center md:shadow-md'>
            <div className='max-w-7xl w-full lg:px-0'>
                <div className='flex gap-5 w-full' >
                    <div className='w-14' >
                        <img src={logo} alt="Bandeira do Brasil" className='h-8 w-10' />
                    </div>
                    <h2 className='w-9/12 text-blue-3 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl '>
                        Organon
                    </h2>
                    <div className='w-3/12 flex justify-end md:hidden '>
                        <img src={flagBrasil} alt="Bandeira do Brasil" className='h-8' />
                    </div>
                </div>
                <section className='py-14' >
                    <div className='flex pb-14 gap-5'>
                        <div className='w-6/12 h-40'>
                            <SectionFooter
                                title="Apoio"
                                description="Lorem, ipsum dolor sit amet."
                            />
                        </div>
                        <div className='w-6/12 h-40'>
                            <SectionFooter
                                title="Sobre"
                                description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa sunt dolorum culpa fugit."
                            />
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <div className=' w-6/12 h-40'>
                            <h4 className='text-center sm:text-justify font-medium text-base sm:text-lg md:text-xl'>Redes Sociais</h4>
                            <div className=' flex py-5 justify-around sm:justify-normal sm:gap-10'>
                                <CiTwitter className='text-2xl'/>
                                <AiOutlineInstagram className=' text-2xl'/>
                                <CiFacebook className='text-2xl'/>
                            </div>
                        </div>
                        <div className='w-6/12 h-40'>
                            <SectionFooter
                                title="Serviços"
                                description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
                            />
                        </div>
                    </div>
                </section>
            </div>
        </footer>      
    )
}

export default Footer