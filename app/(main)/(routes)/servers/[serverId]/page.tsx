"use client";

import { useParams } from "next/navigation";

const ServerIdPage = () => {
  const params = useParams();

  return (
    <div className="flex flex-col w-full h-full justify-center items-center bg-zinc-100/10 dark:bg-zinc-700/40">
      {params.serverId}
    </div>
  );
};

export default ServerIdPage;
