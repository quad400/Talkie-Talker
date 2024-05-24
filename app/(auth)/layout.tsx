import { merienda } from "@/components/web-loader";
import { cn } from "@/lib/utils";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row mx-8 space-y-5 h-screen justify-center md:justify-evenly items-center">
      <div
        className={cn(
          "text-4xl font-bold dark:text-white space-y-4 text-black text-center",
          merienda.className
        )}
      >
        Welcome to Talkie Talker
        <div className="text-base font-medium mt-2 text-muted-foreground">...playground for any type of communication</div>
      </div>
      {children}
    </div>
  );
};

export default MainLayout;
