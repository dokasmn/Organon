// React
import React, {useState, useMemo} from 'react';
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';

// Components
import TitleSection from '../components/layout/TitleSection.tsx';
import ContentCrud from '../components/items/cards/ContentCrud.tsx';
import ButtonNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import Link from '../components/items/buttons/Link.tsx';
import SectionEditProfile from '../components/items/cards/SectionEditProfile.tsx';


// IMAGES
import MathSmallImage from '../assets/images/math-small.png'

const Profile:React.FC = () => {
    return (
        <>            
            <main className={'p-5'} >
                <section className='pb-7' >
                    <TitleSection title="CONTENTS" />
                </section>
                <section>
                    <SectionEditProfile username='Daniel Lima' useremail='daniel@gmail.com' userphoto=""  />
                </section>
            </main>
        </>
    )
}

export default Profile;