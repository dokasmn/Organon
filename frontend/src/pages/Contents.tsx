// React
import React from 'react';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';

// Components
import TitleSection from '../components/layout/TitleSection.tsx';
import ContentCrud from '../components/items/cards/ContentCrud.tsx';
import BottomNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import Link from '../components/items/buttons/Link.tsx';
import Title from '../components/items/texts/Title.tsx';
import TopNavigationBar from '../components/layout/TopNavigationBar.tsx';

// IMAGES
import MathSmallImage from '../assets/images/math-small.png'

const Contents:React.FC = () => {
    return (
        <div className='sm:flex justify-center'>  
            <TopNavigationBar/>
            <div className=''>
                <main className={'px-5 xs:px-14 md:pt-32 md:px-10 max-w-160 sm:min-w-160'} >
                    <section className='pb-5 md:pb-0'>
                        <TitleSection title="CONTENTS"/>
                        <div className='hidden md:block'>
                            <Title text="Conteúdos"/>
                        </div>
                        <HorizontalLine style='w-full hidden md:block mt-5'/>
                    </section>
                    <section>
                        <ContentCrud content='Matrizes' subject='Matemática' image={MathSmallImage} />
                        <ContentCrud content='Matrizes' subject='Matemática' image={MathSmallImage} />
                        <ContentCrud content='Matrizes' subject='Matemática' image={MathSmallImage} />
                    </section>
                    <HorizontalLine style='w-full'/>
                    <Link
                        text="Add Content"
                        style='flex justify-center md:bg-blue-5 md:text-white md:hover:bg-blue-5-dark md:shadow-md w-full text-black bg-white-2 hover:bg-white-2-dark rounded font-bold py-3'
                        to='/perfil/conteudo/criar-conteudo'
                    />
                </main>
                <BottomNavigationBar/>
            </div>
        </div>
    )
}

export default Contents;