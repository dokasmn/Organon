// REACT
import React, { useEffect, useState } from 'react';

// IMAGES
import { IoClose } from "react-icons/io5";

interface PopUpEditProfileProps {
  initialUsername: string;
  initialProfilePic: string;
  onSave: (username: string, profilePic: string) => void;
  onClose: () => void;
}

const PopUpEditProfile: React.FC<PopUpEditProfileProps> = ({ initialUsername, initialProfilePic, onSave, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(initialUsername);
  const [profilePic, setProfilePic] = useState<string>(initialProfilePic);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSave = () => {
    setIsVisible(false);
    setTimeout(() => {
      onSave(username, profilePic);
      onClose();
    }, 300);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-start justify-center mt-4 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      <div className="fixed  inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className={`relative md:w-96 border-l-4 p-6 rounded shadow-lg transform ${isVisible ? 'scale-100' : 'scale-90'} bg-white transition-transform duration-300`} role="alert">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl">Editar perfil</h2>
          <button onClick={handleClose} className="text-lg font-semibold"><IoClose/></button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Foto de Perfil</label>
          <input
            type="text"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={handleSave} className="bg-blue-2 text-white py-2 px-4 rounded hover:bg-blue-5-dark">Save</button>
        </div>
      </div>
    </div>
  );
}

export default PopUpEditProfile;
