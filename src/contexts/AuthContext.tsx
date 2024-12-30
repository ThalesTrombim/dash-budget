import { createContext, ReactNode, useEffect, useState } from "react";
import { useGoogleLogin } from "../hooks/useLoginWithGoogle";
import { browserLocalPersistence, onAuthStateChanged, setPersistence, signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";

interface UserData {
  id: string;
  name: string | null;
  avatar: string | null;
}

interface AuthContextData {
  user?: UserData | null;
  setUser: (value: any) => void;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthContextProvider = ({ children }: { children: ReactNode}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const { signInWithGoogle } = useGoogleLogin();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);

        onAuthStateChanged(auth, async (currentUser) => {
          if(currentUser) {
            setUser({
              id: currentUser.uid,
              name: currentUser.displayName,
              avatar: currentUser.photoURL,
            })
          }
        });
      } catch (error) {
        console.error("Erro ao configurar persistência:", error);
      }
    };

    initializeAuth();
  }, [])

  async function handleLogin() {
    try {
      const userData = await signInWithGoogle();
      
      if(userData) {
        setUser({
          id: userData.uid, 
          name: userData.displayName, 
          avatar: userData.photoURL
        });
      }

      navigate("/");
    } catch (error) {
      console.log('Error: ', error);
    }

  }

  async function handleLogout () {
    try {
      await signOut(auth);
      
      setUser(null);
      navigate("/")
    } catch (error) {
      console.log('error: ', error)
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
      { children }
    </AuthContext.Provider>
  );
}