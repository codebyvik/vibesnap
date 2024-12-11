import PageHeader from "@/components/shared/pageHeader/pageHeader";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiPencil } from "react-icons/hi2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { uploadPreset, uploadUrl } from "@/configs/cloudinary";
import axios, { AxiosResponse } from "axios";
import { fetchUserData, updateProfile } from "@/redux/auth.redux";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { baseRoutes } from "@/routes/routes";

const EditProfile = () => {
  const dispatch = useDispatch();
  const profilePicInputRef = useRef<HTMLInputElement | null>(null);
  const coverPicInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();
  const { userDetails, success, isLoading } = useSelector((state: any) => state?.auth?.user);
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profilePic, setProfilePic] = useState<any>(null);
  const [coverPic, setCoverPic] = useState<any>(null);

  useEffect(() => {
    if (!userDetails) {
      dispatch(fetchUserData());
    }

    if (userDetails) {
      setName(userDetails?.name);
      setBio(userDetails?.bio);
    }
  }, [userDetails]);

  useEffect(() => {
    if (success) {
      toast({
        title: "Profile Updated",
      });
      setTimeout(() => {
        dispatch(fetchUserData());
        navigate(`${baseRoutes.userProfile}/${userDetails?.uid}`, { replace: true });
      }, 1000);
    }
  }, [success]);

  const handleProfilePicChange = (e: any) => {
    const file = e?.target?.files[0];
    const data = {
      url: URL.createObjectURL(file),
      file,
    };
    setProfilePic(data);
  };
  const handleCoverPicChange = (e: any) => {
    const file = e?.target?.files[0];
    const data = {
      url: URL.createObjectURL(file),
      file,
    };
    setCoverPic(data);
  };

  const handleEditProfilePic = () => {
    if (profilePicInputRef.current) {
      profilePicInputRef.current.click();
    }
  };
  const handleEditCoverPic = () => {
    if (coverPicInputRef.current) {
      coverPicInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    let data: any = {
      name,
      bio,
      uid: userDetails?.uid,
    };

    try {
      if (profilePic?.file) {
        const profileFormData = new FormData();
        profileFormData.append("file", profilePic?.file);
        profileFormData.append("upload_preset", uploadPreset);
        profileFormData.append("folder", "profile");

        const Profileresponse: AxiosResponse = await axios.post(`${uploadUrl}`, profileFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        data.profilePicture = {
          public_id: Profileresponse.data.public_id,
          public_url: Profileresponse.data.url,
        };
      }

      if (coverPic?.file) {
        const coverFormData = new FormData();
        coverFormData.append("file", coverPic?.file);
        coverFormData.append("upload_preset", uploadPreset);
        coverFormData.append("folder", "coverPicture");

        const coverPicresponse: AxiosResponse = await axios.post(`${uploadUrl}`, coverFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        data.coverPic = {
          public_id: coverPicresponse.data.public_id,
          public_url: coverPicresponse.data.url,
        };
      }

      dispatch(updateProfile(data));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <PageHeader label={"Edit Profile"} />
      <div>
        <div className="relative w-full ">
          <div className="relative w-full h-[170px] rounded-b-2xl overflow-hidden bg-gray-400 flex justify-center items-center">
            <input
              ref={coverPicInputRef}
              type="file"
              accept="image/*"
              onChange={handleCoverPicChange}
              style={{ display: "none" }} // Hide the default file input
            />
            {userDetails?.coverPic?.public_url || coverPic ? (
              <img
                className="w-full h-full object-fill"
                src={coverPic?.url || userDetails?.coverPic?.public_url}
                alt="cover-pic"
              />
            ) : (
              <p className="font-bold text-white text-lg">Add Cover Pic</p>
            )}
            <div
              onClick={handleEditCoverPic}
              className="absolute bottom-2 right-2 w-[30px] h-[30px] rounded-full bg-gray-100 flex justify-center items-center  cursor-pointer"
            >
              <HiPencil className="w-[12px] text-black" />
            </div>
          </div>
          <div className="w-[100px] h-[100px] rounded-full  absolute z-10 bottom-[-30%] left-5">
            <div className="w-full h-full ">
              <input
                ref={profilePicInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                style={{ display: "none" }} // Hide the default file input
              />

              <Avatar className="w-full h-full">
                <AvatarImage
                  src={`${profilePic ? profilePic?.url : userDetails?.profilePicture?.public_url}`}
                />
                <AvatarFallback>{userDetails?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div
                onClick={handleEditProfilePic}
                className="absolute bottom-2 right-0 w-[30px] h-[30px] rounded-full bg-gray-100 flex justify-center items-center cursor-pointer"
              >
                <HiPencil className="w-[12px] text-black" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[70px] px-2">
          <Label htmlFor="name">Name</Label>
          <Input
            className="border-b-[1px] border-t-0 border-r-0 border-l-0 border-black shadow-none focus:outline-none focus:ring-0  outline-none rounded-none font-bold"
            type="text"
            id="name"
            placeholder="User Name"
            style={{
              boxShadow: "none",
              outline: "none",
            }}
            onChange={(e) => setName(e?.target?.value)}
            value={name}
          />

          <Label htmlFor="bio">Bio</Label>

          <Textarea
            className="resize-y border-b-[1px] border-t-0 border-r-0 border-l-0 border-black shadow-none focus:outline-none focus:ring-0  outline-none rounded-none font-bold"
            id="bio"
            placeholder="Type Bio here ..."
            style={{
              boxShadow: "none",
              outline: "none",
            }}
            onChange={(e) => setBio(e?.target?.value)}
            value={bio}
          />
        </div>
      </div>
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className="mb-5 flex items-center justify-center bg-bgDark text-white px-4 py-2 rounded-full shadow hover:bg-gray-800 focus:outline-none w-[300px] mx-auto"
      >
        {isLoading ? "saving..." : "Save "}
      </button>
    </div>
  );
};

export default EditProfile;
