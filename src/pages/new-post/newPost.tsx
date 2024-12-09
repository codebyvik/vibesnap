import CustomFileCarousel from "@/components/carousel/customImageCarousel";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/redux/post.redux";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NewPost = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [text, setText] = useState("");
  const { userDetails } = useSelector((state: any) => state?.auth?.user);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const highlightHashtags = (input: string) => {
    const hashtagRegex = /#\w+/g; // Match full hashtags

    const parts = input.split(/(#\w+)/g); // Split the text, keeping hashtags in the array

    return parts.map((part, idx) => {
      if (hashtagRegex.test(part)) {
        // If the part is a hashtag, style it
        return (
          <span key={idx} className="text-blue-500">
            {part}
          </span>
        );
      }

      // Otherwise, render plain text
      return <span key={idx}>{part}</span>;
    });
  };

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

  const handleCreatePosts = () => {
    const filteredFiles = files?.map((item: any) => item?.file);
    const data = {
      uid: userDetails?.uid,
      files: filteredFiles,
      text,
    };

    dispatch(createPost(data));
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="w-full">
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
