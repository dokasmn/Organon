// React
import React, {useState, useMemo} from 'react';
import HorizontalLine from '../components/items/HorizontalLine.tsx';

// Components
import TitleSection from '../components/layout/TitleSection';
import ContentCrud from '../components/items/ContentCrud.tsx';
import ButtonNavigationBar from '../components/items/BottomNavigationBar.tsx';
import Link from '../components/items/Link.tsx';

// IMAGES
import MathSmallImage from '../assets/images/math-small.png'

const Profile:React.FC = () => {
    return (
        <>            
            <main className={'px-6 py-5'} >
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
                    to='/contents'
                />

            </main>
            <ButtonNavigationBar/>
        </>
    )
}

export default Profile;