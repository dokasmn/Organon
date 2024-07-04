import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: ({}: {email: string, is_professor: boolean, is_school_user: boolean, token: string}) => void;
  logout: () => void;
  isSchool: boolean;
  isProfessor: boolean;
}

// Criação do contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define as props do provedor de autenticação
interface AuthProviderProps {
  children: ReactNode;
}

// Componente provedor do contexto de autenticação
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isProfessor, setIsprofessor] = useState<boolean>(false);
    const [isSchool, setIsSchool] = useState<boolean>(false);
    
    const login = (data: {email: string, is_professor: boolean, is_school_user: boolean, token: string}) => {
        setIsAuthenticated(true);

        if(data.is_professor){
            setIsprofessor(true);
        }

        if(data.is_school_user){
            setIsSchool(true);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isSchool, isProfessor }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
