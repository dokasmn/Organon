//REACT
import React from 'react';

//COMPONENTS
import InputSearch from '../items/inputs/InputSearch';

//IMAGES
import flagBrasilDesktop from '../../assets/images/flag_brasil_desktop.png'
import flagSantaCatarinaDesktop from '../../assets/images/flag_santa_catarina_desktop.png'

const HeaderHome:React.FC = () => {
    return (
        <>
            <header className='hidden h-16 items-center text-white md:flex my-1 w-full max-w-7xl'>
                <div className={' w-2/12 '}>
                    <img src={flagSantaCatarinaDesktop} alt="" className={' w-16 '} />
                </div>            
                    
                <div className={'w-8/12 flex justify-center '} >
                    <InputSearch id="search-content" placeholder="Pesquisar" />
                </div>

                <div className={' w-2/12 flex justify-end'}>
                    <img src={flagBrasilDesktop} alt="" className={' w-16 '} />
                </div>    
            </header>
        </>
    )
}

export default HeaderHome