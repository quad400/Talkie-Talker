"use client"


import { ActionTooltip } from "@/components/action.tooltip";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";

const NavAction = () => {

  const {onOpen} = useModal()

  return (
    <div className="flex-col space-y-3 justify-center items-center">
      <ActionTooltip side="right" align="center" label="Add a server">
        <button onClick={()=> onOpen("createServer")} className="group">
          <div className="flex h-[48px] w-[48px] rounded-full group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 mx-auto rounded-md" />
    </div>
  );
};

export default NavAction;
