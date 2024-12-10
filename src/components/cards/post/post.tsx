import Share from "@/components/shared/share/share";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { likePost, unlikePost } from "@/redux/post.redux";
import { highlightHashtags } from "@/utils/paragraph.utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useRef, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

dayjs.extend(relativeTime);
interface iPostProps {
  postDetails: any;
  isVisible?: boolean;
  postIdx?: number;
}

const Post = ({ postDetails, isVisible, postIdx }: iPostProps) => {
  const dispatch = useDispatch();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [postLiked, setPostLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState<number>(postDetails?.likes?.length);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [showshareModal, setShowShareModal] = useState<boolean>(false);

  const { userDetails } = useSelector((state: any) => state?.auth?.user);

  useEffect(() => {
    const liked = postDetails?.likes?.find((item: any) => item === userDetails?.uid);
    setPostLiked(!!liked);
    setTotalLikes(postDetails?.likes?.length);
  }, [postDetails]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        videoRef.current.muted = false;
      } else {
        videoRef.current.play();
        videoRef.current.muted = false;
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    setTotalLikes(totalLikes + 1);
    setPostLiked(true);
    dispatch(likePost({ postId: postDetails?.id, uid: userDetails?.uid }));
  };
  const handleUnlike = () => {
    setTotalLikes(totalLikes - 1);
    setPostLiked(false);
    dispatch(unlikePost({ postId: postDetails?.id, uid: userDetails?.uid }));
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isVisible]);
  return (
    <div id={`post-${postIdx}`} className="px-3 py-2 bg-yellow-100 rounded-2xl mt-2 mb-4">
      <div className="flex gap-2 items-center">
        <Avatar className="w-[40px] h-[40px] rounded-full ">
          <AvatarImage src={`${postDetails?.userProfilePicture?.public_url}`} />
          <AvatarFallback>{userDetails?.name?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col justify-center">
          <h6 className="font-bold">{postDetails?.userName}</h6>
          <p className="opacity-40 text-sm">
            {dayjs(postDetails?.createdAt?.seconds * 1000).fromNow()}
          </p>
        </div>
      </div>
      <div className="text-wrap mt-2">{highlightHashtags(postDetails?.text)}</div>
      <div className=" h-[300px] overflow-x-scroll rounded-2xl flex gap-2">
        {postDetails?.files?.map((item: any, idx: any) => {
          if (item?.mediaType === "image") {
            return (
              <img
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`cursor-pointer h-full ${
                  postDetails?.files?.length === 1
                    ? "w-[100%]"
                    : selectedIndex === idx
                    ? "w-[70%]"
                    : "w-[30%]"
                } object-cover rounded-2xl transition-all duration-500 ease-in-out`}
                src={`${item?.public_url}`}
                alt={`post-${idx}-image`}
              />
            );
          } else {
            return (
              <video
                key={idx}
                onClick={() => {
                  setSelectedIndex(idx);
                  handlePlayPause();
                }}
                ref={videoRef}
                className={`cursor-pointer h-full ${
                  postDetails?.files?.length === 1
                    ? "w-[100%]"
                    : selectedIndex === idx
                    ? "w-[70%]"
                    : "w-[30%]"
                } object-cover rounded-2xl transition-all duration-500 ease-in-out`}
                muted
                loop
                controls={false}
              >
                <source src={`${item?.public_url}`} />
              </video>
            );
          }
        })}
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-1 items-center text-pink-600">
          {postLiked ? (
            <FaHeart onClick={handleUnlike} className="cursor-pointer" />
          ) : (
            <FaRegHeart onClick={handleLike} className="cursor-pointer" />
          )}

          <p>{totalLikes}</p>
        </div>
        <div
          onClick={() => setShowShareModal(true)}
          className="flex gap-1 items-center px-3 py-1 rounded-full bg-gray-50 cursor-pointer"
        >
          <IoPaperPlane />
          <p className="font-bold text-sm">Share</p>
        </div>
      </div>
      {showshareModal && (
        <Share
          url={`${window.location.href}${postDetails?.id}`}
          showModal={showshareModal}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default Post;
