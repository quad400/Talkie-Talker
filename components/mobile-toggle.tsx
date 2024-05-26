import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import NavSidebar from "@/app/(main)/(routes)/_components/nav-sidebar";
import ServerSideNav from "@/app/(main)/(routes)/_components/server-sidenav";



export const MobileToggle = ({ serverId }: { serverId: any }) => {
  
  return (
      <Sheet>
        <SheetTrigger asChild className="md:hidden bg-zinc-900">
          <Button variant="ghost" size="icon">
            <Menu className="h-8 w-8" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="m-0 p-0 ">
          <div className="flex h-full">
            <NavSidebar />
            <ServerSideNav serverId={serverId} />
          </div>
        </SheetContent>
      </Sheet>
  );
};
