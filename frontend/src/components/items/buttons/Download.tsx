// Link.tsx
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

interface DownloadProps {
    text: React.ReactNode | string;
    style?: string;
    file: string;
    download: string;
}

const Download: React.FC<DownloadProps> = ({ text, style = '', file, download }) => {
    
    return (
        <a
            className={`block ${style}`} // Usando "block" para garantir que o link seja renderizado como um elemento de bloco
            href={file}
            target="_blank" // Abre o link em uma nova aba
            rel="noopener noreferrer" // Adiciona relações de segurança recomendadas ao usar target="_blank"
            download={download} // Especifica o atributo download para iniciar o download
        >
            {text}
        </a>
    );
};

export default Download;