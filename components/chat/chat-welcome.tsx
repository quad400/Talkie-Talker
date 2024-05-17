interface ChatWelcomeProps {
  name: string;
  type: "channel" | "chat";
}

const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="flex flex-col space-y-2 my-4">
      {type === "channel" && (
        <div className="bg-zinc-700/30 h-14 w-14 rounded-full flex justify-center items-center">
          <span className="text-[30px] font-semibold">#</span>
        </div>
      )}
      <div className="text-xl font-semibold">
        Welcome to {type === "channel" ? `#${name}` : name}
      </div>
      <div className="text-sm text-zinc-400 dark:text-zinc-500">
        This is the start of{" "}
        {type === "channel" ? `the #${name} channel` : "your chat"}
      </div>
    </div>
  );
};

export default ChatWelcome;
