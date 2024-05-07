"use client";

import Image from "next/image";
import { Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action.tooltip";

interface NavItemProps {
  data: Server;
}

const NavItem = ({ data }: NavItemProps) => {
  const params = useParams();
  const router = useRouter()

  const handleRoute = ()=> {
    router.push(`/servers/${data.id}`)
  }

  return (
    <div className="mb-3">
      <ActionTooltip side="right" align="center" label={data.name}>
        <button onClick={handleRoute} className="group relative items-center flex justify-center">
          <div
            className={cn(
              "absolute left-0 bg-primary rounded-r-full transition-all w-1",
              params?.serverId !== data.id && "group-hover:h-[20px]",
              params?.serverId === data.id ? "h-[36px]" : "h-[8px]"
            )}
          />
          <div
            className={cn(
              "relative h-[48px] mx-3 w-[48px] group rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
              params?.serverId === data.id &&
                "bg-primary/10 text-primary rounded-[16px]"
            )}
          >
            <Image
              fill
              src={data.imageUrl}
              alt={data.name}
              className="group-hover:text-white transition h-full w-full"
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavItem;
