import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface iPageHeaderProps {
  label: string;
  color?: string;
}

const PageHeader = ({ label, color }: iPageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div
      className={`flex gap-9 text-${
        color ? color : "white"
      } bg-transparent absolute top-2 left-0 w-full font-bold z-30 px-3 py-1`}
    >
      <ArrowLeft className="cursor-pointer" onClick={handleBack} />
      <h5>{label}</h5>
    </div>
  );
};

export default PageHeader;
