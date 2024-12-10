import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMdAdd } from "react-icons/io";

import "./homepage.style.css";
import { signOutUser } from "@/redux/auth.redux";
import { useNavigate } from "react-router-dom";
import { routeNames } from "@/routes/routes";
import Navbar from "@/layout/navbar";
const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const showMessageStatus = getLocalStorageItem("welcomeMessageShowed");

  const { userDetails } = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    if (!showMessageStatus) {
      setShowMessage(true);
      setTimeout(() => {
        setLocalStorageItem("welcomeMessageShowed", true);
        setShowMessage(false);
      }, 2000);
    }
  }, [showMessageStatus]);

  const handleNewPostClick = () => {
    navigate(routeNames.newPost);
  };

  return (
    <>
      <Navbar />
      {/* Welcome animation */}
      <div
        className={`w-full flex gap-2 p-[16px] items-center welcome-message bg-white ${
          showMessage ? "slideInSlideOut" : ""
        }`}
      >
        <Avatar>
          <AvatarImage src={`${userDetails?.profilePicture?.public_url}`} />
          <AvatarFallback>{userDetails?.name?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div>
          <p className="opacity-30 text-[16px]">Welcome Back</p>
          <p className="text-[16px] font-[600]">{userDetails?.name}</p>
        </div>
      </div>
      <div className="h-[calc(100vh-50px)] px-2 pb-1">
        <div>
          <h4 className="text-lg font-bold">Feeds</h4>
        </div>

        <button onClick={() => dispatch(signOutUser())}>signout</button>

        {/* Floating add post button */}

        <div
          onClick={handleNewPostClick}
          className="absolute bottom-10 right-10 h-[40px] w-[40px] rounded-full flex justify-center items-center bg-black cursor-pointer"
        >
          <IoMdAdd className="text-white text-2xl" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
