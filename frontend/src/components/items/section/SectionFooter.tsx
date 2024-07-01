interface SectionFooterProps {
    title: string,
    description: string,
}

const SectionFooter:React.FC<SectionFooterProps> = ({title, description}) => {
    return (
        <div >
            <h3 className='text-base sm:text-lg md:text-xl font-medium pb-3 text-center sm:text-justify' >{title}</h3>
            <p className="text-justify text-sm text-gray-800" >{description}</p>
        </div>
    )
}

export default SectionFooter;