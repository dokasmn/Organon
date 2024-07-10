// REACT
import React, { useEffect, useState } from 'react';

// COMPONENTS
import Input from '../items/inputs/Input';
import UploadFile from '../items/inputs/UploadFile';
import Button from '../items/buttons/Button';
import PopUpBase from './PopUpBase';

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
    <PopUpBase onClose={handleClose} onSave={handleSave} title="Editar perfil" isVisible={isVisible} >
      <div className="mb-4">
        <label className="block text-gray-700 mb-3">Nome de usuário:</label>
        <Input
          id="edit-name"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Editar nome'
        />
      </div>
      <div className="mb-4">
        <UploadFile
          text='Imagem de Perfil'
          id="profile_image"
          onChange={() => {}}
        />
      </div>
    </PopUpBase>
  );
}

export default PopUpEditProfile;
