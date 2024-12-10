import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { shareicons } from "@/constants/shareIcons.constants";
import { useEffect, useState } from "react";
import { IoIosCopy } from "react-icons/io";

interface ishareProps {
  url: string;
  showModal: boolean;
  onClose: () => void;
}

const Share = ({ url, showModal, onClose }: ishareProps) => {
  const [isOpen, setIsOpen] = useState(showModal);

  useEffect(() => {
    if (showModal) {
      setIsOpen(true); // Open immediately
    }
  }, [showModal]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    // TODO show - toast
  };

  const handleShare = (appName: string) => {
    let shareUrl = "";

    switch (appName) {
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "Instagram":
        alert("Instagram sharing is only available via mobile apps.");
        return;
      case "Twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(url)}`;
        break;
      case "Reddit":
        shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}`;
        break;
      case "Discord":
        shareUrl = `https://discord.com/channels/@me`; // Discord sharing requires pasting text manually
        break;
      case "Messenger":
        shareUrl = `fb-messenger://share?link=${encodeURIComponent(url)}`;
        break;
      case "Whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
        break;
      case "Telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`;
        break;
      default:
        alert("Unsupported app!");
        return;
    }

    // Open the URL in a new tab
    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="w-[80%] rounded-lg md:w-[350px] px-2 py-3">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl text-start">Share Post</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-2 py-4 justify-items-center">
            {shareicons.map((item, idx) => (
              <div
                className={`w-[50px] h-[50px] rounded-full flex justify-center items-center cursor-pointer`}
                key={idx}
                style={{ backgroundColor: item.color }}
                onClick={() => handleShare(item.appName)}
              >
                <img className="w-[30px]" src={item.icon} alt={`share-icon-${idx}`} />
              </div>
            ))}
          </div>
          <DialogFooter className="">
            <div className="w-full">
              <h6 className="font-bold">Page Link</h6>
              <p className="px-3 py-3 relative bg-gray-100 rounded-lg text-gray-400 text-sm">
                {url}
                <IoIosCopy
                  onClick={handleCopy}
                  className="absolute right-2 top-[10px] text-xl cursor-pointer"
                />
              </p>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Share;
