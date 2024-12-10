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
}

const Post = ({ postDetails }: iPostProps) => {
  const dispatch = useDispatch();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [postLiked, setPostLiked] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { userDetails } = useSelector((state: any) => state?.auth?.user);

  useEffect(() => {
    const liked = postDetails?.likes?.find((item: any) => item?.uid === userDetails?.uid);

    if (liked) {
      setPostLiked(true);
    } else {
      setPostLiked(false);
    }
  }, [postDetails]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    dispatch(likePost({ postId: postDetails?.id, uid: userDetails?.uid }));
  };
  const handleUnlike = () => {
    dispatch(unlikePost({ postId: postDetails?.id, uid: userDetails?.uid }));
  };

  return (
    <div className="px-3 py-2 bg-yellow-100 rounded-2xl">
      <div className="flex gap-2 items-center">
        <img
          className="w-[40px] h-[40px] rounded-full "
          src={`${postDetails?.userProfilePicture?.public_url}`}
          alt=""
        />
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
                onClick={() => setSelectedIndex(idx)}
                className={`cursor-pointer h-full ${
                  selectedIndex === idx ? "w-[70%]" : "w-[30%]"
                } object-cover rounded-2xl transition-all duration-500 ease-in-out`}
                src={`${item?.public_url}`}
                alt={`post-${idx}-image`}
              />
            );
          } else {
            return (
              <video
                onClick={() => {
                  setSelectedIndex(idx);
                  handlePlayPause();
                }}
                ref={videoRef}
                className={`cursor-pointer h-full ${
                  selectedIndex === idx ? "w-[70%]" : "w-[30%]"
                } object-cover rounded-2xl transition-all duration-500 ease-in-out`}
                autoPlay
                loop
                controls={false} // Disables default controls
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
            <FaHeart onClick={handleLike} className="cursor-pointer" />
          ) : (
            <FaRegHeart onClick={handleUnlike} className="cursor-pointer" />
          )}

          <p>{postDetails?.likes?.length}</p>
        </div>
        <div className="flex gap-1 items-center px-3 py-1 rounded-full bg-gray-50 cursor-pointer">
          <IoPaperPlane />
          <p className="font-bold text-sm">Share</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
