import { cn } from "@/lib/utils";
import { Merienda } from "next/font/google";

export const merienda = Merienda({
    weight: ["300", "400", "500", "600", "700", "800"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-merienda",
  });
  
  const WebLoader = () => {

  return (
    <div className="flex flex-col space-x-2 justify-center items-center bg-zinc-200 h-screen dark:bg-zinc-900">
      <div
        className={cn(
          "text-4xl font-bold dark:text-white text-black",
          merienda.className
        )}
      >
        Talkie Talker
      </div>
      <div className="mt-10 space-x-4 justify-center items-center flex">
        <div className="h-8 w-8 bg-zinc-900 dark:bg-zinc-300  rounded-full animate-bounce [animation-delay:-0.7s]" />
        <div className="h-8 w-8 bg-zinc-900 dark:bg-zinc-300 rounded-full animate-bounce [animation-delay:-0.20s]" />
        <div className="h-8 w-8 bg-zinc-900 dark:bg-zinc-300 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default WebLoader;
