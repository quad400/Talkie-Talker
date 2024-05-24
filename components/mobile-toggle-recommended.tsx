import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import NavSidebar from "@/app/(main)/(routes)/_components/nav-sidebar";



const MobileToggleRecommended = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild className="md:hidden bg-neutral-900">
          <Button variant="ghost" size="icon">
            <Menu className="h-8 w-8" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="m-0 p-0 w-[100px]">
            
          <div className="flex h-full">
            <NavSidebar />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileToggleRecommended;
