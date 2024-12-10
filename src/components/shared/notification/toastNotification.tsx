import { useToast } from "@/hooks/use-toast";

const ToastNotification = () => {
  const { toast } = useToast();

  return (
    <button
      onClick={() => {
        toast({
          variant: "destructive",
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      }}
    >
      Show Toast
    </button>
  );
};

export default ToastNotification;
