import { v4 as uuidV4 } from "uuid";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import {currentProfile} from "@/lib/current-profile";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  const profile = await currentProfile();

  if (!profile) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!params.serverId) {
    return new NextResponse("Server Id Missing", { status: 400 });
  }

  try {
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidV4(),
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


