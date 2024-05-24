import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import {currentProfile} from "@/lib/current-profile";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    const server = await db.server.update({
      where: {
        id: params.serverId,
        members: {

          some: {
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      data: {
        members: {
          create: {
            profileId: profile.id,
          },
        },
      },
    });

    if (!server) {
      return new NextResponse("Duplicate profile not allowed", { status: 400 });
    }
    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse(`Internal server error, ${error}`, { status: 500 });
  }
}
