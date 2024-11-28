import React, { createContext, useContext, useState } from "react";
import { AuthService } from "../Services/AuthService";
import { trackPromise } from "react-promise-tracker";
import Swal from "sweetalert2";

interface AuthContextType {
  isAuthenticated: boolean;
  accessLevel: number | null;
  login: (
    password: string,
    user: string,
    rememberMe: boolean | false
  ) => Promise<boolean>;
  logout: () => void;
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    JSON.parse(sessionStorage.getItem("isAuthenticated") ?? "false")
  );
  const [accessLevel, setAccessLevel] = useState<number | null>(
    Number(sessionStorage.getItem("accessLevel") ?? null)
  );
  const [userId, setUserId] = useState<number>(
    Number(sessionStorage.getItem("userId") ?? 0)
  );

  async function login(user: string, password: string, rememberMe: boolean): Promise<boolean> {
    return await trackPromise(AuthService.login(user, password))
      .then((res) => {
        const userData = res.data.data;
        setIsAuthenticated(true);
        setAccessLevel(userData.type);
        setUserId(userData.id);
        
        if(userData.id){
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("accessLevel", userData.type);
        sessionStorage.setItem("userName", userData.name);
        sessionStorage.setItem("userId", userData.id);
        }else{
          sessionStorage.setItem("isAuthenticated", "false");
          return false;
        }
  
        return true;
      })
      .catch((err) => {
        return false;
      });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAccessLevel(null);
  };

  return (
    <UserContext.Provider
      value={{ isAuthenticated, accessLevel, login, logout }}
    >
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
