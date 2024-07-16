// REACT
import React, { useEffect, useRef } from 'react';

// COMPONENTS
import Link from '../items/buttons/Link';
import Button from '../items/buttons/Button';

// HOOKS
import useRequests from '../../hooks/useRequests.tsx';
import { useLoading } from '../../contexts/LoadingContext.tsx';

// AXIOS
import axiosInstance from '../../axiosConfig.ts';



interface PopUpEditContentProps {
    contentId: string;
    onClose: () => void;
}

const PopUpEditContent: React.FC<PopUpEditContentProps> = ({ contentId, onClose }) => {
    const popupRef = useRef<HTMLDivElement | null>(null);

    const { setShowLoading } = useLoading();
    
    const { showError, showUnespectedResponse, headersJsonToken } = useRequests();

    const requestDeleteContent = async () => {
        try {
            const response = await axiosInstance.delete(`course/content/${contentId}`, {
                headers: headersJsonToken
            })
            if (response.status === 204) {
                window.location.reload();
            } else {
                showUnespectedResponse(response);
            }
        } catch (error: any) {
            setShowLoading(false);
            showError(error);
        }

    }

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
                to="/"
                text="Editar"
                style="bg-blue-1 hover:bg-blue-1-dark mb-2 flex items-center justify-center rounded md:rounded-none w-full py-2"
            />
            <Button
                text="Remover"
                style="bg-red-2 bg-opacity-80 shadow-none hover:bg-red-2-dark rounded w-full px-0 py-0"
                onClick={requestDeleteContent}
            />
        </div>
    );
}

export default PopUpEditContent;
