import React, { useState, useEffect } from 'react';

// COMPONENTS
import AnswersStudent from '../components/items/cards/AnswersStudent.tsx';
import SectionEditProfile from '../components/items/section/SectionEditProfile.tsx';
import BottomNavigationBar from '../components/layout/BottomNavigationBar.tsx';
import SliderSubjectsBar from '../components/items/sliders/SliderSubjectsProgress.tsx';
import TopNavigationBar from '../components/layout/TopNavigationBar.tsx';

// IMAGES
import profilePicture from '../assets/images/profile-picture/profile-picture-2.png';
import markerStudent from '../assets/images/marker-student.png';
import philosophyRedSmall from '../assets/images/subjects_image/philosophy-red-small.png';
import mathBlueSmall from '../assets/images/subjects_image/math-blue-small.png';
import historyYellowOrangeSmall from '../assets/images/subjects_image/history-yellow-orange-small.png';
import grammarMarineBlueSmall from '../assets/images/subjects_image/grammar-marine-blue-small.png';
import englishPurpleSmall from '../assets/images/subjects_image/english-purple-small.png';
import chemicalPinkSmall from '../assets/images/subjects_image/chemical-pink-small.png';
import geographyYellowSmall from '../assets/images/subjects_image/geography-yellow-small.png';
import artsOrangeSmall from '../assets/images/subjects_image/arts-orange-small.png';
import literatureGreenYellowSmall from '../assets/images/subjects_image/literature-green-yellow-small.png';
import physicsPurplePinkSmall from '../assets/images/subjects_image/physics-purple-pink-small.png';
import sociologyRedPinkSmall from '../assets/images/subjects_image/sociology-red-pink-small.png';
import biologyGreenBlueSmall from '../assets/images/subjects_image/biology-green-blue-small.png';

// CONTEXT
import { useAuth } from '../contexts/AuthContext.tsx';

// AXIOS
import axiosInstance from '../axiosConfig.ts';

// UTILS
import { decodeStringUrl } from '../utils.ts';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const [subjectProgress, setSubjectProgress] = useState<{ [subject: string]: number }>({});

    useEffect(() => {
        const subjects = [
            "Matemática",
            "Gramática",
            "Filosofia",
            "Inglês",
            "Sociologia",
            "História",
            "Física",
            "Química",
            "Biologia",
            "Artes",
            "Literatura",
            "Geografia",
        ];

        const fetchProgress = async (subject: string) => {
            try {
                const decodeSubject = decodeStringUrl(subject);
                const response = await axiosInstance.get(`home/content/?content_subject__subject_name=${decodeSubject}`, {
                    headers: {
                        'Authorization': `Token ${user.token}`,
                    },
                });
                if (response.status === 200) {
                    const contents = response.data.results;
                    const finalizedContents = contents.filter((content: any) => content.content_finished == true);
                    console.log(`conteudos finalizados: ${finalizedContents.length}`)
                    return finalizedContents.length / contents.length * 100;
                } else {
                    return 0;
                }
            } catch (error: any) {
                console.log(`Erro ao atualizar status do conteúdo: ${error}`);
                return 0;
            }
        };

        const updateProgress = async () => {
            const progressUpdates: { [subject: string]: number } = {};
            for (const subject of subjects) {
                progressUpdates[subject] = await fetchProgress(subject);
            }
            setSubjectProgress(progressUpdates);
        };

        updateProgress();
    }, [user.token]);

    const slidesSubject = [
        { subject: "Matemática", lastContent: "Conteúdo Atual", progress: subjectProgress["Matemática"] || 0, image: mathBlueSmall },
        { subject: "Gramática", lastContent: "Conteúdo Atual", progress: subjectProgress["Gramática"] || 0, image: grammarMarineBlueSmall },
        { subject: "Filosofia", lastContent: "Conteúdo Atual", progress: subjectProgress["Filosofia"] || 0, image: philosophyRedSmall },
        { subject: "Inglês", lastContent: "Conteúdo Atual", progress: subjectProgress["Inglês"] || 0, image: englishPurpleSmall },
        { subject: "Sociologia", lastContent: "Conteúdo Atual", progress: subjectProgress["Sociologia"] || 0, image: sociologyRedPinkSmall },
        { subject: "História", lastContent: "Conteúdo Atual", progress: subjectProgress["História"] || 0, image: historyYellowOrangeSmall },
        { subject: "Física", lastContent: "Conteúdo Atual", progress: subjectProgress["Física"] || 0, image: physicsPurplePinkSmall },
        { subject: "Química", lastContent: "Conteúdo Atual", progress: subjectProgress["Química"] || 0, image: chemicalPinkSmall },
        { subject: "Biologia", lastContent: "Conteúdo Atual", progress: subjectProgress["Biologia"] || 0, image: biologyGreenBlueSmall },
        { subject: "Artes", lastContent: "Conteúdo Atual", progress: subjectProgress["Artes"] || 0, image: artsOrangeSmall },
        { subject: "Literatura", lastContent: "Conteúdo Atual", progress: subjectProgress["Literatura"] || 0, image: literatureGreenYellowSmall },
        { subject: "Geografia", lastContent: "Conteúdo Atual", progress: subjectProgress["Geografia"] || 0, image: geographyYellowSmall },
    ];

    return (
        <section className='flex justify-center'>
            <TopNavigationBar />
            <main className={'px-5 xs:px-14 md:px-10 md:pt-40 md:max-w-6xl min-w-5 max-w-160 sm:min-w-160'}>
                <div className='flex flex-col'>
                    <SectionEditProfile username={user.username} useremail={user.email} userphoto={profilePicture} />
                    <section className='py-10 flex items-center'>
                        <div className="w-20 h-2 bg-dotted-line bg-repeat-x"></div>
                        <img src={markerStudent} alt="" className='w-12 lg:w-14' />
                    </section>
                    <AnswersStudent answers={24} correctAnswers={16} incorrectAnswers={8} />
                </div>
                <SliderSubjectsBar slides={slidesSubject} />
            </main>
            <BottomNavigationBar />
        </section>
    );
};

export default Profile;
