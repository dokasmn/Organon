// REACT
import React, {useState} from "react"

// IMAGES
import { BsPen } from "react-icons/bs";

// COMPONENTS
import Button from "../buttons/Button";
import PopUpEditProfile from "../../popups/PopUpEditProfile";

interface SectionEditProfileProps {
    username: string,
    useremail: string,
    userphoto: string,
    userCode: string,
}

const SectionEditProfile:React.FC<SectionEditProfileProps> = ({username, useremail, userphoto, userCode}) => {
    const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
    const [usernameEdit, setUsernameEdit] = useState<string>('');
    const [profilePic, setProfilePic] = useState<string>('');

    const handleEditUser = (newUsername: string, newProfilePic: string) => {
        setUsernameEdit(newUsername);
        setProfilePic(newProfilePic);
    };
    
    return (
        <section className="flex gap-3 w-full ">
            {showEditPopup && (
                <PopUpEditProfile
                    initialUsername={usernameEdit}
                    initialProfilePic={profilePic}
                    onSave={handleEditUser}
                    onClose={() => setShowEditPopup(false)}
                />
            )}
            <div className="w-7/12 flex lg:border lg:bg-white lg:shadow-md border-black border-opacity-30 lg:py-3 lg:px-5">            
                <div className="flex items-center pr-3 md:pr-7" >
                    <img src={userphoto} alt="Photo of user" className="rounded-full border border-black border-opacity-50 max-w-16 min-w-16 lg:rounded-lg "  />
                </div>
                <div className="">
                    <h3 className="text-lg font-semibold ">{username}</h3>
                    <p className="">{useremail}</p>
                </div>
                {/* <p className="pt-0.5 lg:flex lg:w-full justify-end">Cod: {userCode}</p> */}
            </div>
            <div className="w-5/12 flex justify-end">
                <div className="hidden lg:block w-36 " >
                    <Button text="Editar perfil" onClick={() => setShowEditPopup(true)}  />
                </div>
                
                <div className="p-4 rounded border border-black hover:bg-blue-1-opacity lg:hidden h-12" >
                    <BsPen/>
                </div>
            </div>
        </section>
    )
}

export default SectionEditProfile;