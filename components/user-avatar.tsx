import { Avatar, AvatarImage } from "./ui/avatar";

const UserAvatar = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Avatar>
      <AvatarImage src={imageUrl} alt="Avatar" />
    </Avatar>
  );
};

export default UserAvatar;
