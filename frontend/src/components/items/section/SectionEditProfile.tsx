// REACT
import React from "react"

// IMAGES
import { BsPen } from "react-icons/bs";

// COMPONENTS
import Button from "../buttons/Button";

interface SectionEditProfileProps {
    username: string,
    useremail: string,
    userphoto: string,
    userCode: string,
}

const SectionEditProfile:React.FC<SectionEditProfileProps> = ({username, useremail, userphoto, userCode}) => {
    return (
        <section className="flex gap-3 w-full ">
            <div className="w-7/12 flex lg:border bg-white md:shadow-md border-black border-opacity-30 lg:py-3 lg:px-5">            
                <div className="flex items-center pr-3 md:pr-7" >
                    <img src={userphoto} alt="Photo of user" className="rounded-full border border-black border-opacity-50 max-w-16 min-w-16 lg:rounded-lg "  />
                </div>
                <div className="">
                    <h3 className="text-lg font-semibold ">{username}</h3>
                    <p className="">{useremail}</p>
                    
                </div>
                <p className="pt-0.5 lg:flex lg:w-full justify-end">Cod: {userCode}</p>
            </div>
            <div className="w-5/12 flex justify-end">
                <div className="hidden lg:block w-36 " >
                    <Button text="Editar perfil"/>
                </div>
                
                <div className="p-4 rounded border border-black hover:bg-blue-1-opacity lg:hidden h-12" >
                    <BsPen/>
                </div>
            </div>
        </section>
    )
}

export default SectionEditProfile;