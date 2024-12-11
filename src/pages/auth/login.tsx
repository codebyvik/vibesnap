import GoogleLogo from "../../assets/icons/google-logo.png";
import LoginBg from "../../assets/background-images/login-bg.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth.redux";
import Logo from "../../assets/icons/vibesnap-logo.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../routes/routes";
import { getLocalStorageItem } from "@/utils/localstorage";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userDetails } = useSelector((state: any) => state.auth.user);

  const handleGoogleLogin = () => {
    dispatch(loginUser());
  };

  const signedIn = getLocalStorageItem("signedIn");
  // useEffect(() => {
  //   // if signedIn or if login is success navigate the user to home page

  //   if (userDetails) {
  //     navigate(routeNames.homePage);
  //   }
  // }, [userDetails, signedIn]);

  return (
    <div className="flex justify-center items-center h-screen w-full ">
      <div className=" shadow-lg h-full sm:w-[392px] w-full relative">
        <img className="w-full h-[70%] object-fill" src={LoginBg} alt="LoginBg" />
        <div className="h-[40%] absolute bottom-0 left-0 w-full bg-white rounded-t-[50px] p-3">
          <div className="h-full w-full flex  items-center flex-col mt-3">
            <div className="flex gap-2 items-center justify-center">
              <img src={Logo} alt="Logo" />
              <h5 className="p-0 m-0 text-[28px] font-[600]">Vibesnap</h5>
            </div>
            <p className="text-[16px] font-[400] mb-3">Moments That Matter, Shared Forever.</p>

            {/* SIGNIN with google btn */}
            <button
              onClick={handleGoogleLogin}
              className="mt-5 flex items-center justify-center bg-bgDark text-white px-4 py-2 rounded-full shadow hover:bg-gray-800 focus:outline-none"
            >
              <img src={GoogleLogo} alt="Google Logo" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
