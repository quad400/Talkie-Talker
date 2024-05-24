"use client";

import { ActionTooltip } from "@/components/action.tooltip";
import { Button } from "@/components/ui/button";
import { FolderSearch2 } from "lucide-react";
import { useRouter } from "next/navigation";

const RecommendedAction = () => {
  const router = useRouter();

  return (
    <ActionTooltip label="Recommended Servers" side="left" align="start">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.replace("/servers/recommended")}
      >
        <FolderSearch2 className="text-white h-7 w-7" />
      </Button>
    </ActionTooltip>
  );
};

export default RecommendedAction;
