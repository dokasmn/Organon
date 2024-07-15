import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: {id:"" ,email: string, is_professor: boolean, is_school_user: boolean, token: string, username: string}) => void,
  logout: () => void,
  isSchool: boolean,
  isProfessor: boolean,
  user: {id: string, email: string, is_professor: boolean, is_school_user: boolean, token: string, username: string},
  loading: boolean,
  changeEmail: (newEmail: string) => void,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

type userType = {
  id:string,
  email: string, 
  is_professor: boolean, 
  is_school_user: boolean, 
  token: string, 
  username: string,
}

export const AuthProvider: FC<AuthProviderProps> = React.memo(({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isProfessor, setIsProfessor] = useState<boolean>(false);
    const [isSchool, setIsSchool] = useState<boolean>(false);
    const [user, setUser] = useState<userType>(
      {id:"" , email: "", is_professor: false, is_school_user: false, token: "", username: ""}
    );
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const data = JSON.parse(storedUser);
        console.log(data)
        setIsAuthenticated(true);
        setUser(data);
        setIsProfessor(data.is_professor);
        setIsSchool(data.is_school_user);
      }
      
      setLoading(false);
    }, [localStorage.getItem('user')]);
    
    const login = (data: userType) => {
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
      setIsProfessor(false);
      setIsSchool(false);
      setUser({id:"", email: "", is_professor: false, is_school_user: false, token: "", username: ""});
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    };

    const changeEmail = (newEmail: string) => {
      const storedUser = localStorage.getItem('user');
      if(storedUser){
        const data = JSON.parse(storedUser);
        data.email = newEmail
        localStorage.setItem('user', JSON.stringify(data));
      }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, isSchool, isProfessor, user, loading, changeEmail }}>
            {children}
        </AuthContext.Provider>
    );
});

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
