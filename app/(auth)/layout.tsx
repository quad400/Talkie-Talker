import { merienda } from "@/components/web-loader";
import { cn } from "@/lib/utils";
import Image from "next/image";

const MainLayout = ({ children }: { children: React.ReactNode }) => {

  
  return (
    <div className="flex flex-col bg-zinc-800 md:flex-row mx-8 space-y-5 mt-16 md:mt-0 h-full justify-center md:justify-evenly items-center">
      <div className="flex flex-col space-y-4 justify-center items-center">
        <div className="relative h-[100px] w-[150px] md:h-[150px] md:w-[230px]">
          <Image src="/logo.png" alt="logo" fill />
        </div>
        <div
          className={cn(
            "text-4xl font-bold text-zinc-300 text-center",
            merienda.className
          )}
        >
          Welcome to Talkie Talker
        </div>
        <div className="text-base font-medium mt-2 text-muted-foreground">
          ...playground for any type of communication
        </div>
      </div>
      {children}
    </div>
  );
};

export default MainLayout;
