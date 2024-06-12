// React
import React, {useState, useMemo} from 'react';
import HorizontalLine from '../components/items/HorizontalLine.tsx';

// Components
import TitleSection from '../components/layout/TitleSection';
import ContentCrud from '../components/items/ContentCrud.tsx';
import ButtonNavigationBar from '../components/items/BottomNavigationBar.tsx';

// IMAGES
import MathSmallImage from '../assets/images/math-small.png'

const Profile:React.FC = () => {
    return (
        <>            
            <main className={'px-6 py-5'} >
                <section>
                    <TitleSection title="CONTENTS" />
                </section>
                <section className='py-3'>
                    <HorizontalLine width='w-full'/>
                </section>
                <section>
                    <ContentCrud content='Matrizes' subject='Matemática' image={MathSmallImage} />
                    <ContentCrud content='Matrizes' subject='Matemática' image={MathSmallImage} />
                    <ContentCrud content='Matrizes' subject='Matemática' image={MathSmallImage} />
                </section>
                
            </main>
            <ButtonNavigationBar/>
        </>
    )
}

export default Profile;