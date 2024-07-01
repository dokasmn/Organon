import React from 'react';

interface UploadFileMobileProps {
    text: string,
    id: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const UploadFileMobile:React.FC<UploadFileMobileProps> = ({text, id, onChange}) => {
    return (
        <>
            <label htmlFor={id} className={`font-semibold cursor-pointer flex justify-center bg-blue-5 text-white px-5 py-2 rounded md:rounded-none md:drop-shadow-xl hover:bg-blue-5-dark w-full `}>
                {text}
            </label>
            <input type="file" className='hidden' id={id} onChange={onChange}/>
        </>
    )
}

export default UploadFileMobile;