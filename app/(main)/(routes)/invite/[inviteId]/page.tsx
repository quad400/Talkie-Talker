import { auth } from "@clerk/nextjs";
import { redirect, useParams } from "next/navigation";

import { InviteModal } from "@/components/modals/invite-modal";
import { db } from "@/lib/db";

const InvitePage = async ({params}: {params: {inviteId: string}}) => {

  const {userId} = auth();

  if (!userId) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      inviteCode: params.inviteId,
    },
    include: {
      members: {
        include: {
          profile: true,
        },
      },
    },
  });

  if (!server) {
    return null;
  }



  return (
    <div>
      <InviteModal server={server} />
    </div>
  );
};

export default InvitePage;
