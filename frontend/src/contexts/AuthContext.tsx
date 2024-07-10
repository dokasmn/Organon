import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: {email: string, is_professor: boolean, is_school_user: boolean, token: string, username: string}) => void;
  logout: () => void;
  isSchool: boolean;
  isProfessor: boolean;
  user: {email: string, is_professor: boolean, is_school_user: boolean, token: string, username: string};
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isProfessor, setIsProfessor] = useState<boolean>(false);
    const [isSchool, setIsSchool] = useState<boolean>(false);
    const [user, setUser] = useState<{email: string, is_professor: boolean, is_school_user: boolean, token: string}>(
      {email: "", is_professor: false, is_school_user: false, token: ""}
    );
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const data = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUser(data);

        if (data.is_professor) {
          setIsProfessor(true);
        }

        if (data.is_school_user) {
          setIsSchool(true);
        }
      }
      setLoading(false);
    }, []);
    
    const login = (data: {email: string, is_professor: boolean, is_school_user: boolean, token: string}) => {
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      localStorage.setItem('token', data.token);

      if(data.is_professor){
          setIsProfessor(true);
      }

      if(data.is_school_user){
          setIsSchool(true);
      }
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isSchool, isProfessor, user, loading }}>
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
