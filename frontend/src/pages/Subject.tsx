// React
import React, {useState, useMemo} from 'react';

// Components
import HorizontalLine from '../components/items/texts/HorizontalLine.tsx';

// IMAGES
import MathSmallImage from '../assets/images/math-small.png'

const Subject:React.FC = () => {
    const urlSplit = location.pathname.split("/")
    const subject = urlSplit[urlSplit.length-1].toLocaleUpperCase();
    
    return (
        <section className='px-5 py-7' >
            <header>
                <section>
                    <h1>{ subject }</h1>
                </section>
                <section></section>
            </header>   
            <HorizontalLine style='w-full' />         
            <main className={'px-5'} >
                
            </main>
            <footer>
            </footer>
        </section>
    )
}

export default Subject;