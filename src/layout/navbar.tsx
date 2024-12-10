import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiAlignRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "@/redux/auth.redux";
import { baseRoutes } from "@/routes/routes";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector((state: any) => state.auth.user);

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  const navigateToProfile = () => {
    navigate(`${baseRoutes.userProfile}/${userDetails?.uid}`);
  };

  return (
    <div className="relative w-full flex justify-between px-3 py-3">
      <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex justify-center items-center">
        <FiAlignRight className="cursor-pointer text-lg" />
      </div>
      <div className="cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={`${userDetails?.profilePicture?.public_url}`} />
              <AvatarFallback>{userDetails?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={navigateToProfile} className="cursor-pointer">
              <User />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
