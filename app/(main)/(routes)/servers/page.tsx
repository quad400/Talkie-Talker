import { InitialModal } from "@/components/modals/initial-modal";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const MainServerPage = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });


  if (servers.length > 0) {
    return redirect(`/servers/${servers[0].id}`);
  } else {
    return redirect("/servers/recommended");
  }
};

export default MainServerPage;
