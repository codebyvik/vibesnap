import twitterIcon from "../assets/icons/twitter-icon.png";
import facebookIcon from "../assets/icons/facebook-icon.png";
import redditIcon from "../assets/icons/reddit-icon.png";
import discordIcon from "../assets/icons/discord-icon.png";
import whatsappIcon from "../assets/icons/whatsapp-icon.png";
import messengerIcon from "../assets/icons/messenger-icon.png";
import telegramIcon from "../assets/icons/telegram-icon.png";
import instagramIcon from "../assets/icons/instagram-icon.png";

interface ishareIcons {
  appName: string;
  icon: string;
  color: string;
}

export const shareicons: ishareIcons[] = [
  {
    appName: "Twitter",
    icon: twitterIcon,
    color: "#E9F6FB",
  },
  {
    appName: "Facebook",
    icon: facebookIcon,
    color: "#E7F1FD",
  },
  {
    appName: "Reddit",
    icon: redditIcon,
    color: "#E9F6FB",
  },
  {
    appName: "Discord",
    icon: discordIcon,
    color: "#ECF5FA",
  },
  {
    appName: "Whatsapp",
    icon: whatsappIcon,
    color: "#E7FBF0",
  },
  {
    appName: "Messenger",
    icon: messengerIcon,
    color: "#E5F3FE",
  },
  {
    appName: "Telegram",
    icon: telegramIcon,
    color: "#E6F3FB",
  },
  {
    appName: "Instagram",
    icon: instagramIcon,
    color: "#FF40C617",
  },
];
