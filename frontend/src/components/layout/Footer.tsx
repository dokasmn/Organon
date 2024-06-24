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
        <footer className='bg-white h-16 p-7 sm:px-16'>
            <div className='flex gap-5 w-full  ' >
                <div className='w-2/12' >
                    <img src={logo} alt="Bandeira do Brasil" className='h-8 w-10' />
                </div>
                <h2 className='w-9/12 text-blue-3 font-semibold text-2xl '>
                    Organon
                </h2>
                <div className='w-3/12 flex justify-end '>
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
                        <h4 className='text-center sm:text-justify font-medium text-base'>Redes Sociais</h4>
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
        </footer>      
    )
}

export default Footer