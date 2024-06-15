import React from "react"

interface SectionEditProfileProps {
    username: string,
    useremail: string,
    userphoto: string,
}

const SectionEditProfile:React.FC<SectionEditProfileProps> = ({username, useremail, userphoto}) => {
    return (
        <section>
            <div>
                <img src={userphoto} alt="Photo of user" />
            </div>
            <div>
                <h3 className="">{username}</h3>
                <p className="">{useremail}</p>
            </div>
            <div>

            </div>
        </section>
    )
}

export default SectionEditProfile;