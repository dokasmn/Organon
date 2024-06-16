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
        <section className='py-5' >
            <h4 className='text-lg font-semibold pb-2'>Seu Progresso</h4>
            <div className='flex items-center justify-around py-2 w-full border border-black rounded' >
                <div className='text-center'>
                    <p>Answers</p>
                    <p className='font-semibold'>{answers}</p>
                </div>
                <div className='text-center'>
                    <p>Correct</p>
                    <p className='font-semibold'>{correctAnswers}</p>
                </div>
                <div className='text-center'>
                    <p>Incorrect</p>
                    <p className='font-semibold'>{incorrectAnswers}</p>
                </div>
            </div>
        </section>
    )
}

export default AnswersStudent;