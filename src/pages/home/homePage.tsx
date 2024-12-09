import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Skeleton } from "../../components/shared/loader/skeleton";
import "./homepage.style.css";
import { signOutUser } from "@/redux/auth.redux";
const HomePage = () => {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const showMessageStatus = getLocalStorageItem("welcomeMessageShowed");

  const { userDetails } = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    if (!showMessageStatus) {
      setShowMessage(true);
      setTimeout(() => {
        setLocalStorageItem("welcomeMessageShowed", true);
        setShowMessage(false);
      }, 4000);
    }
  }, [showMessageStatus]);

  return (
    <>
      {/* Welcome animation */}
      <div
        className={`flex gap-2 p-[16px] items-center welcome-message bg-white ${
          showMessage ? "slideInSlideOut" : ""
        }`}
      >
        <>
          <Avatar>
            <AvatarImage src={`${userDetails?.profilePicture}`} />
            <AvatarFallback>{userDetails?.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <p className="opacity-30 text-[16px]">Welcome Back</p>
            <p className="text-[16px] font-[600]">{userDetails?.name}</p>
          </div>
        </>
      </div>

      <button onClick={() => dispatch(signOutUser())}>signout</button>
    </>
  );
};

export default HomePage;
