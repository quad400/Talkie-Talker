import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import NavSidebar from "@/app/(main)/(routes)/_components/nav-sidebar";
import ServerSideNav from "@/app/(main)/(routes)/_components/server-sidenav";

export const MobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    <Sheet key="left">
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 flex md:hidden justify-center items-center"
        >
          <Menu className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0 " side="left">
        <div className="flex h-full justify-start items-start">
          <NavSidebar />
          <ServerSideNav serverId={serverId} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
