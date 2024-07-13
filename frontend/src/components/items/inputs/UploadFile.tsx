import React from 'react';

interface UploadFileProps {
    text: string,
    id: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    accept: string,
}

const UploadFile: React.FC<UploadFileProps> = ({ text, id, onChange, accept }) => {

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            onChange(event);
        }
    }

    return (
        <>
            <label htmlFor={id} className='font-semibold cursor-pointer flex justify-center bg-blue-5 text-white px-5 py-2 rounded md:rounded-none md:drop-shadow-xl hover:bg-blue-5-dark w-full'>
                {text}
            </label>
            <input type="file" className='hidden' id={id} onChange={handleFileChange}  accept={accept} />
        </>
    )
}

export default UploadFile;
