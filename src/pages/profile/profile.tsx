import PageHeader from "@/components/shared/pageHeader/pageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchAllMyPosts } from "@/redux/post.redux";
import { baseRoutes } from "@/routes/routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { userDetails } = useSelector((state: any) => state?.auth?.user);
  const { myPostsArray } = useSelector((state: any) => state?.posts?.allPosts);
  useEffect(() => {
    dispatch(fetchAllMyPosts({ uid: params?.id }));
  }, [dispatch, params?.id]);

  const handleEditProfile = () => {
    navigate(`${baseRoutes.editProfile}/${params?.id}`);
  };

  return (
    <div>
      <PageHeader label={"Profile"} />

      <div className="relative w-full ">
        <div className=" w-full h-[170px] rounded-b-2xl overflow-hidden bg-gray-400 flex justify-center items-center">
          {userDetails?.coverPic ? (
            <img
              className="w-full h-full object-fill"
              src={userDetails?.coverPic}
              alt="cover-pic"
            />
          ) : (
            <p className="font-bold text-white text-lg">Add Cover Pic</p>
          )}
        </div>
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden absolute z-10 bottom-[-30%] left-5">
          <Avatar className="w-full h-full">
            <AvatarImage src={`${userDetails?.profilePicture}`} />
            <AvatarFallback>{userDetails?.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          {/* <img className="w-full h-full object-cover" src={userDetails?.} alt="profile-pic" /> */}
        </div>
        <div className="  rounded-full overflow-hidden absolute top-[110%] right-3">
          <button
            onClick={handleEditProfile}
            className=" flex items-center justify-center border-[1px] border-black bg-white  px-4 py-1 rounded-full focus:outline-none w-[250px]"
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="mt-[70px] px-2">
        <h3 className="font-bold text-2xl ">{userDetails?.name}</h3>
        <p>{userDetails?.bio || "Add your bio"}</p>
      </div>
      <div className="mt-2 px-2 ">
        <h5 className="font-[600] text-[18px]">My Posts</h5>

        <div className="md:h-[400px] h-[300px] overflow-scroll">
          <div
            className="grid grid-cols-2 gap-2 md:gap-4  p-4"
            style={{
              gridAutoRows: "200px", // Default row height
            }}
          >
            {myPostsArray?.map((post: any, index: any) => (
              <div
                key={post?.id}
                className={`relative overflow-hidden rounded-lg shadow-lg group ${
                  index % 3 === 0 ? "row-span-2 md:h-[300px] h-[200px]" : "h-[150px] md:h-[200px]"
                }`}
              >
                {post?.files?.[0]?.mediaType === "image" ? (
                  <img
                    src={post?.files?.[0]?.public_url}
                    alt={post?.text}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    className="cursor-pointer h-full w-full object-cover"
                    controls={false}
                    autoPlay
                    loop
                  >
                    <source src={post?.files?.[0]?.public_url} />
                  </video>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300"></div>

                {/* Text Content */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-semibold">{post?.text}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">❤️ {post?.likes?.length}</span>
                  </div>
                </div>

                {/* Count Overlay (Optional) */}
                {post?.files?.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs">
                    1 / {post?.files?.length}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
