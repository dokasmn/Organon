// REACT
import React, { useEffect, useRef } from 'react';

// COMPONENTS
import Link from '../items/buttons/Link';
import Button from '../items/buttons/Button';

interface PopUpEditContentProps {
    contentId: string,
    onClose: () => void,
    onDelete: () => void,
}

const PopUpEditContent: React.FC<PopUpEditContentProps> = ({ onClose, contentId, onDelete }) => {
    const popupRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            ref={popupRef}
            className="absolute border border-gray-1 border-opacity-30 -top-16 -end-24 bg-white flex flex-col justify-center items-center text-white rounded-sm w-28 h-24 text-xs px-2 shadow-sm"
        >
            <Link
                to={`/perfil/conteudo/criar-conteudo/${contentId}`}
                text="Editar"
                style="bg-gray-600 hover:bg-gray-700 mb-2 flex items-center justify-center rounded md:rounded-none w-full py-2"

            />
            <Button
                onClick={onDelete}
                text="Remover"
                style="bg-red-2 bg-opacity-80 shadow-none hover:bg-red-2-dark rounded w-full px-0 py-0"
            />
        </div>
    );
}

export default PopUpEditContent;
