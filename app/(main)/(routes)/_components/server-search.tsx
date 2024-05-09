"use client";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ServerWithMemberAndChannel } from "@/types";
import { Command, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="w-full">
      <Button
        onClick={() => setOpen(true)}
        className="mt-4 hover:text-zinc-600 w-full flex group justify-between items-center text-zinc-500 dark:text-zinc-600 text-sm bg-zinc-200 transition font-normal dark:bg-zinc-900/50"
        variant="ghost"
      >
        <div className="inline-flex">
          <Search className="h-5 w-5 text-zinc-500 dark:text-zinc-600 mr-1" />
          Search
        </div>
        <kbd className="text-sm bg-zinc-300 transition-all dark:bg-zinc-950/40 px-2 py-1 group-hover:bg-zinc-200/40 dark:group-hover:bg-zinc-800 rounded-md">
          ⌘ K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Seach all channels and members..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {data.map(({ data, type, label }) => {
            if (!data?.length) return null;
          
            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ icon, name, id }) => (
                  <CommandItem key={id}>
                    {icon} <span>{name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default ServerSearch;
