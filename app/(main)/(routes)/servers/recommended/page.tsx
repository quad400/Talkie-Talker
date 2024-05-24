import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import ServerItem from "../../_components/server-item";
import { currentProfile } from "@/lib/current-profile";
import { MobileToggle } from "@/components/mobile-toggle";
import MobileToggleRecommended from "@/components/mobile-toggle-recommended";

const RecommendedPage = async () => {
  const profile = await currentProfile();

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          NOT: {
            profileId: profile?.id,
          },
        },
      },
    },
    include: {
      members: true,
    },
  });

  const filteredServer = servers.filter((server) => {
    const serverWithMember = server.members.find(
      (member) => member.profileId === profile?.id
    );

    if (serverWithMember?.serverId !== server.id) {
      return server;
    }
  });

  return (
    <div className="w-full h-full">
      <div className="w-full shadow-lg py-5 px-6 space-x-3 bg-zinc-800/30 flex justify-start items-center">
        <MobileToggleRecommended />
        <div className="text-lg md:text-xl font-semibold ">
          Recommended Servers
        </div>
      </div>
      {filteredServer.length > 0 && (
        <ScrollArea className="flex px-4 flex-col space-y-2">
          {filteredServer.map((server, _) => (
            <ServerItem
            key={server.id}
              serverId={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
              members={server.members.length}
            />
          ))}
        </ScrollArea>
      )}

      {filteredServer.length === 0 && (
        <div className="flex justify-center items-center w-full h-full">
          <div className="text-lg md:text-2xl text-center font-semibold">
            No Recommended Server
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedPage;
