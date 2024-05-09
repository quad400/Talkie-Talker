const Loading = () => {
  return (
    <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
      <span className="sr-only bg-black">Talkie Talker</span>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.7s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.20s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loading;
