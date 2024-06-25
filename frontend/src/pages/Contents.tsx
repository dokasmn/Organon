// React
import React, {useState, useMemo} from 'react';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';

// Components
import TitleSection from '../components/layout/TitleSection.tsx';
import ContentCrud from '../components/items/cards/ContentCrud.tsx';
import ButtonNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import Link from '../components/items/buttons/Link.tsx';
import Title from '../components/items/texts/Title.tsx';
import TopNavigationBar from '../components/layout/TopNavigationBar.tsx';

// IMAGES
import MathSmallImage from '../assets/images/math-small.png'

const Contents:React.FC = () => {
    return (
        <>  
            <TopNavigationBar/>
            <main className={'px-5 sm:px-14 md:pt-32 md:px-10 md:max-w-160'} >
                <section className='pb-7 md:pb-0'>
                    <TitleSection title="CONTENTS"/>
                    <div className='hidden md:block'>
                        <Title text="Conteúdos"/>
                    </div>
                    <HorizontalLine style='w-full hidden md:block'/>
                </section>
                <section>
                    <ContentCrud content='Matrizes' subject='Matemática' image={MathSmallImage} />
                    <ContentCrud content='Matrizes' subject='Matemática' image={MathSmallImage} />
                    <ContentCrud content='Matrizes' subject='Matemática' image={MathSmallImage} />
                </section>
                <HorizontalLine style='w-full'/>
                <Link 
                    text="Add Content" 
                    style='flex justify-center w-full text-black bg-white-2 hover:bg-white-2-dark rounded font-bold py-3' 
                    to='perfil/conteudo/criar-conteudo'
                />

            </main>
            <ButtonNavigationBar/>
        </>
    )
}

export default Contents;