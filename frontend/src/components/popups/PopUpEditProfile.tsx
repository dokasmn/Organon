// src/popups/PopUpEditProfile.tsx
import React, { useEffect, useState } from 'react';
import Input from '../items/inputs/Input';
import UploadFile from '../items/inputs/UploadFile';
import PopUpBase from './PopUpBase';

// HOOKS
import { useAuth } from '../../contexts/AuthContext';

// AXIOS
import axiosInstance from '../../axiosConfig.ts';

interface PopUpEditProfileProps {
  initialUsername: string;
  initialProfilePic: string;
  pk: string;
  onSave: (username: string, profilePic: string, pk: string) => void;
  onClose: () => void;
}

const PopUpEditProfile: React.FC<PopUpEditProfileProps> = ({ initialUsername, initialProfilePic, pk, onSave, onClose }) => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(initialUsername);
  const [profilePic, setProfilePic] = useState<string>(initialProfilePic);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSave = async () => {
    try {
      const response = await axiosInstance.patch(`login/user/${pk}/`,
        {
          username: username,
        },{
          headers: {
            'Authorization': `Token ${user.token}`,
            'Content-Type': 'application/json', 
          },
        }
      );
      let data = response.data;
      setIsVisible(false);
      setTimeout(() => {
        onSave(data.username, profilePic, pk);
        onClose();
      }, 300);
    } catch {
      return
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfilePicFile(event.target.files[0]);
    }
  };

  return (
    <PopUpBase onClose={handleClose} onSave={handleSave} title="Editar perfil" isVisible={isVisible}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-3">Nome de usuário:</label>
        <Input
          id="edit-name"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Editar nome"
        />
      </div>
      <div className="mb-4">
        <UploadFile text="Imagem de Perfil" id="profile_image" onChange={handleFileChange} accept='' />
      </div>
    </PopUpBase>
  );
};

export default PopUpEditProfile;
