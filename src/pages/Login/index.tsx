import { useGoogleLogin } from '../../hooks/useLoginWithGoogle';
import loginImg from "../../assets/login-img.png";
import { FaGoogle } from "react-icons/fa";

function Login() {
  const { signInWithGoogle } = useGoogleLogin();
  
  function handleSubmit(event: any) {
    event?.preventDefault();

    signInWithGoogle();
  }

  return (
    <div className='flex w-full p-4'>
      <div className="bg-white flex w-full justify-around items-center rounded-md border border-[#dfe1e8] shadow-md">
        <div className="w-1/2 bg-red-300">
          <img src={loginImg} alt=""  />
        </div>

        <form className="flex flex-col justify-center gap-4">
          <h2 className="text-4xl">Login</h2>
          <span>Faça login para ter acesso as funcionalidades</span>

          <button onClick={(e) => handleSubmit(e)} className='flex items-center justify-center gap-2 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 font-medium'>
            <FaGoogle />
            <span>
              Continuar com google
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;