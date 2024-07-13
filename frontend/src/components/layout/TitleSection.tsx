import React from 'react';

interface TitleSectionProps {
    title: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ title }) => {
    return (
        <section className="w-full bg-blue-3 text-white py-3 flex justify-center font-bold rounded md:hidden">
            <h1>{title}</h1>
        </section>
    );
};

export default TitleSection;
