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
}

const SectionEditProfile:React.FC<SectionEditProfileProps> = ({username, useremail, userphoto}) => {
    return (
        <section className="flex gap-3 items-center w-full ">
            <div className="w-2/12 flex items-center max-w-16 " >
                <img src={userphoto} alt="Photo of user" className="rounded-full border border-black w-12 "  />
            </div>
            <div className="w-8/12 px-2">
                <h3 className=" text-lg font-semibold ">{username}</h3>
                <p className="">{useremail}</p>
            </div>
            <div className="w-3/12 flex justify-end">
                <div className="hidden lg:block w-36 " >
                    <Button text="Editar perfil"/>
                </div>
                
                <div className="p-4 bg-blue-1-opacity rounded border border-black hover:bg-blue-1 lg:hidden" >
                    <BsPen/>
                </div>
            </div>
        </section>
    )
}

export default SectionEditProfile;