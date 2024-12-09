import PageHeader from "@/components/shared/pageHeader/pageHeader";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const EditProfile = () => {
  const { userDetails } = useSelector((state: any) => state?.auth?.user);

  return (
    <div>
      <PageHeader label={"Edit Profile"} />
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
      </div>
      <div className="mt-[70px] px-2">
        <h3 className="font-bold text-2xl ">{userDetails?.name}</h3>
        <p>{userDetails?.bio || "Add your bio"}</p>
      </div>
    </div>
  );
};

export default EditProfile;
