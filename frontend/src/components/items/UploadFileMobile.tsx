import React from 'react';

interface UploadFileMobileProps {
    text: string,
    id: string,
}

const UploadFileMobile:React.FC<UploadFileMobileProps> = ({text, id}) => {
    return (
        <>
            <label htmlFor={id} className={`font-bold cursor-pointer flex justify-center hover: bg-blue-5 text-white px-5 py-2 rounded hover:bg-blue-5-dark w-full`}>
                {text}
            </label>
            <input type="file" className='hidden' id={id} />
        </>
    )
}

export default UploadFileMobile;