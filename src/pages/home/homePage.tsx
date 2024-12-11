import { useEffect, useRef, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMdAdd } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import "./homepage.style.css";
import { useNavigate } from "react-router-dom";
import { routeNames } from "@/routes/routes";
import Navbar from "@/layout/navbar";
import Post from "@/components/cards/post/post";
import { fetchAllPosts } from "@/redux/post.redux";
import { fetchUserData } from "@/redux/auth.redux";
const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const showMessageStatus = getLocalStorageItem("welcomeMessageShowed");
  const [visiblePosts, setVisiblePosts] = useState<number[]>([]);
  const feedContainerRef = useRef<HTMLDivElement | null>(null);

  const { userDetails } = useSelector((state: any) => state.auth.user);
  const { postArray, hasMore, lastVisible } = useSelector((state: any) => state.posts.allPosts);

  useEffect(() => {
    if (!userDetails) {
      dispatch(fetchUserData());
    }
    dispatch(fetchAllPosts({ lastVisible, pageSize: 2 }));
  }, []);

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

  const checkVisibility = () => {
    if (!feedContainerRef.current) return;

    const newVisiblePosts: number[] = [];
    postArray.forEach((_: any, idx: any) => {
      const postElement = document.getElementById(`post-${idx}`);
      if (postElement) {
        const rect = postElement.getBoundingClientRect();
        const isVisible =
          rect.top >= 0 &&
          rect.bottom <= window.innerHeight &&
          rect.left >= 0 &&
          rect.right <= window.innerWidth;

        if (isVisible) {
          newVisiblePosts.push(idx);
        }
      }
    });

    setVisiblePosts(newVisiblePosts);
  };

  useEffect(() => {
    const container = feedContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      requestAnimationFrame(checkVisibility);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [postArray]);

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
      <div className="h-[calc(100%-100px)] px-3 pb-1  ">
        <h4 className="text-[24px] font-[800] mt-4 my-2">Feeds</h4>

        <div id="feedContainer" className="h-[95%] overflow-auto" ref={feedContainerRef}>
          <InfiniteScroll
            dataLength={postArray?.length}
            next={() => dispatch(fetchAllPosts({ lastVisible, pageSize: 20 }))}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="feedContainer"
          >
            {postArray?.map((item: any, idx: any) => (
              <Post
                postDetails={item}
                key={idx}
                isVisible={visiblePosts.includes(idx)}
                postIdx={idx}
              />
            ))}
          </InfiniteScroll>
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
