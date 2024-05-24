import { NextResponse } from "next/server";

import {currentProfile} from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();

    const { searchParams } = new URL(req.url);

    const { name, type } = await req.json();

    const serverId = searchParams.get("serverId");

    if (!profile) {
      throw new NextResponse("Unathenticated", { status: 401 });
    }

    if (!serverId) {
      throw new NextResponse("Missing Server Id", { status: 404 });
    }

    if (!params.channelId) {
      throw new NextResponse("Missing Channel Id", { status: 404 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              not: "GUEST",
            },
          },
        },
        channels: {
          some: {
            id: params.channelId,
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error: any) {
    throw new NextResponse(error?.message || error, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();

    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!profile) {
      throw new NextResponse("Unathenticated", { status: 401 });
    }

    if (!serverId) {
      throw new NextResponse("Missing Server Id", { status: 404 });
    }

    if (!params.channelId) {
      throw new NextResponse("Missing Channel Id", { status: 404 });
    }

    const server = await db.channel.delete({
      where: {
        id: params.channelId,
        serverId: serverId,
        server: {
          members: {
            some: {
              profileId: profile.id,
              role: {
                not: "GUEST",
              },
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error: any) {
    throw new NextResponse(error?.message || error, { status: 500 });
  }
}
