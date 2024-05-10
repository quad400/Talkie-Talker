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
    <Avatar className={cn(className)}>
      <AvatarImage src={imageUrl} alt="Avatar" />
    </Avatar>
  );
};

export default UserAvatar;
