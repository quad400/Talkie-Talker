
import ServerSideNav from "../../_components/server-sidenav";

interface ServerIdLayoutProps {
  children: React.ReactNode;
  params: { serverId: string };
}

const ServerIdLayout = async ({ children, params }: ServerIdLayoutProps) => {
  return (
    <div className="h-full">
      <div className="h-full hidden md:flex fixed z-40 w-full bg-emerald-900 md:w-[230px] pt-1 bg-zinc-200/50 dark:bg-neutral-700/30">
        <ServerSideNav serverId={params.serverId} />
      </div>
      <main className="flex h-full w-full md:pl-[230px] justify-start items-start ">
        {children}
      </main>
    </div>
  );
};

export default ServerIdLayout;
