// React
import React from 'react';

// COMPONENTS
import NavigationSubject from '../components/items/NavigationSubject';

// CSS
import "./Home.css"

const Home:React.FC = () => {
    return (
        <>
            <NavigationSubject/>
            <main className={''}>
            <div className={' relative w-screen overflow-hidden h-128 '} >
                <div className=' bg-black  absolute h-full w-full opacity-45 ' >

                </div>
                <div className='welcome-container-home h-full w-full'>

                </div>
            </div>
            </main>
        </>
        
    )
}

export default Home;