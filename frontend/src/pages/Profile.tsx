// React
import React, {useState, useMemo} from 'react';

// Components
import AnswersStudent from '../components/items/cards/AnswersStudent.tsx';
import SectionEditProfile from '../components/items/cards/SectionEditProfile.tsx';
import ButtonNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import SliderSubjectsBar from '../components/items/sliders/SliderSubjectsProgress.tsx';

// IMAGES
import profilePicture from '../assets/images/profile-picture/profile-picture-2.png'
import philosophyRedSmall from '../assets/images/subjects_image/philosophy-red-small.png'
import mathBlueSmall from '../assets/images/subjects_image/math-blue-small.png'
import historyYellowSmall from '../assets/images/subjects_image/history-yellow-small.png'

const Profile:React.FC = () => {
    const slidesSubject = [
        {subject:"Matemática", teacher:"Ronaldo da Silva", progress:'75', image:philosophyRedSmall},
        {subject:"Matemática", teacher:"Ronaldo da Silva", progress:'75', image:mathBlueSmall},
        {subject:"Matemática", teacher:"Ronaldo da Silva", progress:'75', image:historyYellowSmall},
        {subject:"Matemática", teacher:"Ronaldo da Silva", progress:'75', image:philosophyRedSmall},
        {subject:"Matemática", teacher:"Ronaldo da Silva", progress:'75', image:mathBlueSmall},
        {subject:"Matemática", teacher:"Ronaldo da Silva", progress:'75', image:historyYellowSmall},
    ]

    return (
        <>            
            <main className={'py-5'} >
                <div className='px-5'>
                    <SectionEditProfile username='Daniel Lima' useremail='daniel@gmail.com' userphoto={profilePicture}/>
                    <AnswersStudent answers={24} correctAnswers={16} incorrectAnswers={8}/>
                </div>
                <SliderSubjectsBar slides={slidesSubject} />    
            </main>
            <ButtonNavigationBar/>
        </>
    )
}

export default Profile;