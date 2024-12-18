import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.config";
// import { useLogin } from "./useLogin";

interface IUseGoogleLogin {
  signInWithGoogle: () => Promise<{
    displayName: string
    photoURL: string
    uid: string
  } | undefined >
}

export function useGoogleLogin(): IUseGoogleLogin {

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
  
      const result  = await signInWithPopup(auth, provider);
  
      if(result.user) {
        const { displayName, photoURL, uid, email } = result.user;
  
        if(!displayName || !photoURL) throw new Error("Missing info from google account!")
  
        return {
          displayName,
          photoURL,
          uid
        }
      }
    } catch (error: unknown) {
      console.log('Error: ', error)
    }
  }

  return {
    signInWithGoogle
  }
}