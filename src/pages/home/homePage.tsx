import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMdAdd } from "react-icons/io";

import "./homepage.style.css";
import { useNavigate } from "react-router-dom";
import { routeNames } from "@/routes/routes";
import Navbar from "@/layout/navbar";
import Post from "@/components/cards/post/post";
import { fetchAllPosts } from "@/redux/post.redux";
const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const showMessageStatus = getLocalStorageItem("welcomeMessageShowed");

  const { userDetails } = useSelector((state: any) => state.auth.user);
  const { postArray } = useSelector((state: any) => state.posts.allPosts);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

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
      <div className="h-[calc(100%-100px)] px-3 pb-1">
        <h4 className="text-[24px] font-[800] mt-4 my-2">Feeds</h4>

        {/* posts */}
        <div className="h-[95%] overflow-scroll">
          {postArray?.map((item: any, idx: any) => (
            <Post postDetails={item} key={idx} />
          ))}
        </div>

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
