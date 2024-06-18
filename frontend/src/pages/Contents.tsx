// React
import React, {useState, useMemo} from 'react';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';

// Components
import TitleSection from '../components/layout/TitleSection.tsx';
import ContentCrud from '../components/items/cards/ContentCrud.tsx';
import ButtonNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import Link from '../components/items/buttons/Link.tsx';

// IMAGES
import MathSmallImage from '../assets/images/math-small.png'

const Contents:React.FC = () => {
    return (
        <>            
            <main className={'px-5'} >
                <section className='pb-7' >
                    <TitleSection title="CONTENTS" />
                </section>
                <section>
                    <ContentCrud content='Matrizes' subject='Matemática' image={MathSmallImage} />
                    <ContentCrud content='Matrizes' subject='Matemática' image={MathSmallImage} />
                    <ContentCrud content='Matrizes' subject='Matemática' image={MathSmallImage} />
                </section>
                <HorizontalLine width='w-full'/>
                
                <Link 
                    text="Add Content" 
                    style=' flex justify-center w-full text-black bg-white-2 hover:bg-white-2-dark rounded font-bold py-3' 
                    to='/create-content'
                />

            </main>
            <ButtonNavigationBar/>
        </>
    )
}

export default Contents;