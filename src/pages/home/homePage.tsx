import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/localstorage";
import { useSelector } from "react-redux";
// import { Skeleton } from "../../components/shared/loader/skeleton";

const HomePage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const showMessageStatus = getLocalStorageItem("showWelcomeMessage");

  const { userDetails } = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    if (showMessageStatus) {
      setShowMessage(true);
      setLocalStorageItem("showWelcomeMessage", true);
    }
  }, [showMessageStatus]);

  return (
    <div className="flex justify-center items-center h-screen w-full ">
      <div className=" shadow-lg h-full sm:w-[392px] w-full relative">
        <div className={`flex gap-2 p-[16px] items-center ${showMessage ? "slideInSlideOut" : ""}`}>
          {userDetails?.profilePicture ? (
            <>
              <img
                className="w-[50px] h-[50px] rounded-full "
                src={`${userDetails?.profilePicture}`}
                alt="profile-pic"
              />
              <div>
                <p className="opacity-30 text-[16px]">Welcome Back</p>
                <p className="text-[16px] font-[600]">{userDetails?.name}</p>
              </div>
            </>
          ) : (
            <>loading...</>
            // <Skeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
