// React
import React, {useState, useMemo} from 'react';

// Components
import AnswersStudent from '../components/items/cards/AnswersStudent.tsx';
import SectionEditProfile from '../components/items/section/SectionEditProfile.tsx';
import BottomNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import SliderSubjectsBar from '../components/items/sliders/SliderSubjectsProgress.tsx';

// IMAGES
import profilePicture from '../assets/images/profile-picture/profile-picture-2.png'

import philosophyRedSmall from '../assets/images/subjects_image/philosophy-red-small.png'
import mathBlueSmall from '../assets/images/subjects_image/math-blue-small.png'
import historyYellowOrangeSmall from '../assets/images/subjects_image/history-yellow-orange-small.png'
import grammarMarineBlueSmall from '../assets/images/subjects_image/grammar-marine-blue-small.png'
import englishPurpleSmall from '../assets/images/subjects_image/english-purple-small.png'
import chemicalPinkSmall from '../assets/images/subjects_image/chemical-pink-small.png'
import geographyYellowSmall from '../assets/images/subjects_image/geography-yellow-small.png'
import artsOrangeSmall from '../assets/images/subjects_image/arts-orange-small.png'
import literatureGreenYellowSmall from '../assets/images/subjects_image/literature-green-yellow-small.png'
import physicsPurplePinkSmall from '../assets/images/subjects_image/physics-purple-pink-small.png'
import sociologyRedPinkSmall from '../assets/images/subjects_image/sociology-red-pink-small.png'
import biologyGreenBlueSmall from '../assets/images/subjects_image/biology-green-blue-small.png'

const Profile:React.FC = () => {

    const slidesSubject = [
        {subject:"Matemática", lastContent:"Conteúdo Atual", progress:'75', image:mathBlueSmall},
        {subject:"Gramática", lastContent:"Conteúdo Atual", progress:'75', image:grammarMarineBlueSmall},
        {subject:"Filosofia", lastContent:"Conteúdo Atual", progress:'75', image:philosophyRedSmall},
        {subject:"Inglês", lastContent:"Conteúdo Atual", progress:'75', image:englishPurpleSmall},
        {subject:"Sociologia", lastContent:"Conteúdo Atual", progress:'75', image:sociologyRedPinkSmall},
        {subject:"História", lastContent:"Conteúdo Atual", progress:'75', image:historyYellowOrangeSmall},
        {subject:"Física", lastContent:"Conteúdo Atual", progress:'75', image:physicsPurplePinkSmall},
        {subject:"Química", lastContent:"Conteúdo Atual", progress:'75', image:chemicalPinkSmall},
        {subject:"Biologia", lastContent:"Conteúdo Atual", progress:'75', image:biologyGreenBlueSmall},
        {subject:"Artes", lastContent:"Conteúdo Atual", progress:'75', image:artsOrangeSmall},
        {subject:"Literatura", lastContent:"Conteúdo Atual", progress:'75', image:literatureGreenYellowSmall},
        {subject:"Geografia", lastContent:"Conteúdo Atual", progress:'75', image:geographyYellowSmall},
    ]

    return (
        <>            
            <main className={'pt-5'} >
                <div className='px-5 sm:px-14'>
                    <SectionEditProfile username='Daniel Lima' useremail='daniel@gmail.com' userphoto={profilePicture}/>
                    <AnswersStudent answers={24} correctAnswers={16} incorrectAnswers={8}/>
                </div>
                <SliderSubjectsBar slides={slidesSubject} />    
            </main>
            <BottomNavigationBar/>
        </>
    )
}

export default Profile;