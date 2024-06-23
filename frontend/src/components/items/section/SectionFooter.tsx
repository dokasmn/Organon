interface SectionFooterProps {
    title: string,
    description: string,
}

const SectionFooter:React.FC<SectionFooterProps> = ({title, description}) => {
    return (
        <div >
            <h4 className='text-base font-medium pb-3 text-center' >{title}</h4>
            <p className="text-justify text-sm text-gray-800" >{description}</p>
        </div>
    )
}

export default SectionFooter;