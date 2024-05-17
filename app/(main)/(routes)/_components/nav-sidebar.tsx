import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { ModeToggle } from "@/components/mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";

import NavAction from "./nav-action";
import NavItem from "./nav-item";
import { currentProfile } from "@/lib/current-profile";

const NavSidebar = async () => {

  const profile = await currentProfile();

    if (!profile) {
      return redirect("/");
    }

    const servers = await db.server.findMany({
      where: {
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });


  return (
    <div className="space-y-4 flex flex-col items-center shadow-xl h-full text-primary w-[100px] md:w-full bg-zinc-50 dark:bg-zinc-800/20 py-3">
      <NavAction />
      <div className="flex-1 w-full">
        <ScrollArea>
          {servers.map((server) => (
            <NavItem key={server.id} data={server} />
          ))}
        </ScrollArea>
      </div>
      <ModeToggle />
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            avatarBox: "h-[48px] w-[48px]",
          },
        }}
      />
    </div>
  );
};

export default NavSidebar;
