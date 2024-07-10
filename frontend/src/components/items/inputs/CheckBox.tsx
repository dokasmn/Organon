import React from 'react';
import { IoIosCheckbox } from "react-icons/io";

interface CheckBoxProps {
    checked: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    name: string,
}

const CheckBox:React.FC<CheckBoxProps> = ({ checked, onChange, name }) => {
    return (
        <label className="inline-flex items-center cursor-pointer">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="hidden"
            name={name}
        />
        <span className="w-4 h-4 relative border border-gray-400 transition-all duration-300 ease-in-out bg-white checked:bg-blue-500 checked:border-blue-500">
            {checked && (
                <IoIosCheckbox className='absolute -top-1 -left-1 w-6 h-6 text-blue-3 ' />
            )}
        </span>
        </label>
    );
};

export default CheckBox;