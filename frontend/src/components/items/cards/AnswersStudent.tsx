import React, {useState, useMemo} from 'react';

// COMPONENTS
import ButtonSmallMobile from '../buttons/ButtonSmallMobile';


// IMAGES
import { FaQuestion } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";

interface AnswersStudentProps {
    answers: number,
    correctAnswers: number,
    incorrectAnswers: number,
}

const AnswersStudent:React.FC<AnswersStudentProps> = ({answers, correctAnswers, incorrectAnswers}) => {
    return (
        <section className='pb-14 ' >
            <h4 className='text-lg font-semibold pb-2 md:hidden'>Seu Progresso</h4>
            <div className='flex bg-white md:shadow-md items-center justify-around py-3 w-full border border-black border-opacity-30 rounded lg:rounded-none'>
                <h4 className='text-lg font-semibold pb-2 md:pb-0 hidden md:block'>Seu Progresso</h4>
                <div className='text-center'>
                    <p>Respostas</p>
                    <p className='font-semibold'>{answers}</p>
                </div>
                <div className='text-center'>
                    <p>Corretas</p>
                    <p className='font-semibold'>{correctAnswers}</p>
                </div>
                <div className='text-center'>
                    <p>Incorretas</p>
                    <p className='font-semibold'>{incorrectAnswers}</p>
                </div>
            </div>
        </section>
    )
}

export default AnswersStudent;