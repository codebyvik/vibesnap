import CustomFileCarousel from "@/components/carousel/customImageCarousel";
import PageHeader from "@/components/shared/pageHeader/pageHeader";
import { Textarea } from "@/components/ui/textarea";
import { uploadPreset, uploadUrl } from "@/configs/cloudinary";
import { useToast } from "@/hooks/use-toast";
import { createPost } from "@/redux/post.redux";
import { routeNames } from "@/routes/routes";
import { highlightHashtags } from "@/utils/paragraph.utils";
import axios, { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IuploadedFiles {
  public_id: string | number;
  public_url: string;
  mediaType: string;
}

const NewPost = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [text, setText] = useState("");
  const { userDetails } = useSelector((state: any) => state?.auth?.user);
  const { success } = useSelector((state: any) => state?.posts?.post);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (success) {
      toast({
        title: "Post success",
      });
      setTimeout(() => {
        navigate(routeNames.homePage);
      }, 1000);
    }
  }, [success]);

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files).map((file) => ({
      previewUrl: URL.createObjectURL(file), // Create preview URL for images/videos
      file,
    }));

    setFiles((prevFiles: any) => [...prevFiles, ...selectedFiles]); // Append to existing files
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCreatePosts = async () => {
    const filteredFiles = files?.map((item: any) => item?.file);

    const uploadedFiles: IuploadedFiles[] = [];

    try {
      for (const file of filteredFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", "posts");

        const response: AxiosResponse = await axios.post(`${uploadUrl}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const mediaType = file?.type.startsWith("image/") ? "image" : "video";

        uploadedFiles.push({
          public_id: response.data.public_id,
          public_url: response.data.url,
          mediaType,
        });
      }

      const data = {
        uid: userDetails?.uid,
        files: uploadedFiles,
        text,
        likes: [],
      };

      dispatch(createPost(data));
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between ">
      <PageHeader label={"Profile"} color="black" />
      <div className="w-full mt-[60px]">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelection}
          style={{ display: "none" }} // Hide the default file input
        />

        {files?.length ? (
          <div className="w-full mt-2">
            <CustomFileCarousel files={files} />
          </div>
        ) : (
          <div
            onClick={handleButtonClick}
            className="w-full h-[200px] flex justify-center items-center shadow-md rounded-xl mt-2"
          >
            <button className="custom-file-picker-btn">Select Images/Videos</button>
          </div>
        )}

        <div className="relative mt-5">
          {/* Render processed text */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none p-2 text-gray-800 whitespace-pre-wrap overflow-hidden text-[0.875rem]"
            style={{ zIndex: 1 }}
          >
            {highlightHashtags(text)}
          </div>
          {/* Invisible textarea for user input */}
          <Textarea
            value={text}
            rows={10}
            onChange={handleChange}
            placeholder="Type your message here."
            className="resize-none bg-transparent caret-blue-500 relative focus:outline-none border-none  whitespace-pre-wrap  p-2 text-[0.875rem] "
            style={{ color: "transparent" }}
          />
        </div>
      </div>

      <button
        onClick={handleCreatePosts}
        className="mb-5 flex items-center justify-center bg-bgDark text-white px-4 py-2 rounded-full shadow hover:bg-gray-800 focus:outline-none w-[300px] mx-auto"
      >
        Create Post
      </button>
    </div>
  );
};

export default NewPost;
