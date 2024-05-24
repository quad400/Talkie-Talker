import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";

const UserAvatar = ({
  imageUrl,
  className,
}: {
  imageUrl: string;
  className?: string;
}) => {

  
  return (
    <Avatar  className={cn("relative h-[40px] w-[40px]",className)}>
      <AvatarImage src={imageUrl} alt="Avatar" className="h-full w-full" />
    </Avatar>
  );
};

export default UserAvatar;
