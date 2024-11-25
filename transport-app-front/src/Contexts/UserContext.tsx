import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  accessLevel: number | null;
  login: (password: string, user: string, rememberMe: boolean | false) => boolean;
  logout: () => void;
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(JSON.parse(sessionStorage.getItem('isAuthenticated') ?? 'false')
  );
  const [accessLevel, setAccessLevel] = useState<number | null>(Number(sessionStorage.getItem('accessLevel') ?? null));
  const [user, setUser] = useState<string>(sessionStorage.getItem('userName') ?? '');
  const [userId, setUserId] = useState<number>(Number(localStorage.getItem('userId') ?? 0)
  );

  console.log(isAuthenticated, accessLevel)

  const login = (user: string, password: string, rememberMe: boolean) => {
    if (user === 'lucas' && password === "123") {
      setIsAuthenticated(true);
      setAccessLevel(1);
      setUserId(1)
      setUser(user)
      
      if (rememberMe) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('accessLevel', '1');
        localStorage.setItem('userName', user);
        
      } else {

        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('accessLevel', '1');
        sessionStorage.setItem('userName', user);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAccessLevel(null);
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, accessLevel, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within an UserProvider");
  }
  return context;
};