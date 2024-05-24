"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/user-avatar";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ServerItemProps {
  name: string;
  imageUrl: string;
  members: number;
  serverId: string;
}

const ServerItem = ({ imageUrl, serverId, members, name }: ServerItemProps) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onJoinServer = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/servers/${serverId}/join`);
      toast.success(`Successfull joined ${name}`);
      router.refresh();
    } catch (error) {
      toast.error(`Something is wrong!!!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full mb-4">
      <div className="flex justify-between items-start">
        <div className="flex justify-start items-center space-x-2 mb-1 w-full">
          <div className="relative h-[48px] rounded-full mx-3 w-[48px] overflow-hidden">
            <Image
              fill
              src={imageUrl}
              alt={name}
              className="transition h-full w-full"
            />
          </div>

          {/* <UserAvatar className="h-[50px] w-[50px]" imageUrl={imageUrl} /> */}
          <div className="text-lg font-semibold">
            {name}
            <div className="text-sm text-zinc-500 font-normal">
              {members === 1 ? `${members} member` : `${members} members`}
            </div>
          </div>
        </div>
        <Button
          disabled={loading}
          onClick={onJoinServer}
          variant="primary"
          size="sm"
        >
          Join Server
        </Button>
      </div>
      <Separator className="w-full h-[1px] bg-zinc-800/30" />
    </div>
  );
};

export default ServerItem;
