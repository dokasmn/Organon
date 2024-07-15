import React from 'react';
import { FaQuestion } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import Link from '../buttons/Link';

interface ContentCrudProps {
    content: string,
    subject: string,
    image: string,
    onClick: () => void;
}

const ContentCrud: React.FC<ContentCrudProps> = ({ content, subject, image, onClick }) => {
    return (
        <div className="bg-white-2 md:bg-white md:border border-gray-300 py-3 px-2 flex items-center rounded md:rounded-none mb-5 md:shadow-md">
            <div className="w-2/4 flex items-center">
                <div className="w-2/6 flex justify-center items-center h-full">
                    {image ? (
                        <img className="p-1.5 rounded w-12" src={image} alt="" />
                    ) : (
                        <div className="p-1.5 bg-gray-300 rounded">
                            <FaQuestion className="text-xl" />
                        </div>
                    )}
                </div>
                <div className="w-4/6 px-2">
                    <h2 className="text-sm sm:text-base">{content}</h2>
                    <p className="text-xs text-gray-1 sm:text-sm">{subject}</p>
                </div>
            </div>
            <div className="w-2/4 flex">
                <div className="w-5/6 flex justify-center sm:justify-end items-center">
                    <Link
                        text="View"
                        style="flex justify-center bg-blue-5 hover:bg-blue-5-dark max-w-28 md:shadow-md w-full rounded md:rounded-none font-semibold text-white py-2"
                        to={`/materia/${subject}/${content}`}
                    />
                </div>
                <div className="w-1/6 flex items-center sm:ml-5 justify-center cursor-pointer hover:bg-gray-300 rounded px-1 py-2" onClick={onClick}>
                    <SlOptionsVertical className="text-xl" />
                </div>
            </div>
        </div>
    );
};

export default ContentCrud;
