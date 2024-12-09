import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiAlignRight } from "react-icons/fi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { userDetails } = useSelector((state: any) => state.auth.user);

  return (
    <div className="flex justify-between">
      <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex justify-center items-center">
        <FiAlignRight className="cursor-pointer text-lg" />
      </div>
      <div className="cursor-pointer">
        <Avatar>
          <AvatarImage src={`${userDetails?.profilePicture}`} />
          <AvatarFallback>{userDetails?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
