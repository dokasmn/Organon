import React from 'react';

// COMPONENT
import Link from '../items/buttons/Link';

const TopNavigationBar:React.FC = () => {
    return (
        <section className={'hidden z-40 absolute top-0 w-full py-5 md:flex justify-center'} >
            <nav className={'bg-blue-3 text-white flex justify-center rounded h-20 w-full '} >
                <div className="max-w-7xl flex h-full px-10 w-full" >
                    <h1 className=' font-semibold text-3xl flex items-center text-center w-2/4 lg:w-1/4'>SEU PERFIL</h1>
                    <ul className='flex h-full text-sm lg:text-base gap-8 justify-center lg:justify-end items-center w-2/4 lg:w-3/4 '>
                        <li className='font-semibold border-b-2 border-transparent hover:border-blue-5 hover:text-blue-5 cursor-pointer' >
                            <Link text={
                                <>
                                    <span className='block' >Perfil</span>
                                </>
                            } style="" to="/perfil"/>
                        </li>
                        <li className='font-semibold border-b-2 border-transparent hover:border-blue-5 hover:text-blue-5 cursor-pointer' >
                            <Link text={
                                <>
                                    <span className='lg:hidden'>Notas</span>
                                    <span className='hidden lg:block'>Suas Notas</span>
                                </>
                            } style="" to="/conteudo"/>
                        </li>
                        <li className='font-semibold border-b-2 border-transparent hover:border-blue-5 hover:text-blue-5 cursor-pointer'>
                            <>
                                <Link text={
                                    <>
                                        <span className='lg:hidden'>Segurança</span>
                                        <span className='hidden lg:block'>Segurança da Conta</span>
                                    </>
                                } style="" to="/seguranca-conta" />
                    
                            </>
                        </li>
                        <li className='font-semibold border-b-2 border-transparent hover:border-blue-5 hover:text-blue-5 cursor-pointer'>
                            <Link text={
                                <>
                                    <span className='lg:hidden'>Desativar</span>
                                    <span className='hidden lg:block'>Desativar Conta</span>
                                </>
                            } style="" to="/desativar-conta"/>
                        </li>
                    </ul>
                </div>
            </nav>
        </section>
    )
}

export default TopNavigationBar;