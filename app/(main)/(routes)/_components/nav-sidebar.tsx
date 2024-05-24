
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { ModeToggle } from "@/components/mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";

import NavAction from "./nav-action";
import NavItem from "./nav-item";
import { currentProfile } from "@/lib/current-profile";
import UserButtonComp from "./user-button";
import RecommendedAction from "./recommended-action";

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
    <section className="space-y-4 flex flex-col items-center shadow-xl h-full text-primary w-[100px] md:w-full bg-zinc-50 dark:bg-zinc-800/20 py-3">
      <NavAction />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <NavItem key={server.id} data={server} />
        ))}
      </ScrollArea>
      <RecommendedAction />
      <UserButtonComp />
    </section>
  );
};

export default NavSidebar;
