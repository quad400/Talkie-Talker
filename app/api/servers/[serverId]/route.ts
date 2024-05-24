import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import {currentProfile} from "@/lib/current-profile";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  const { name, imageUrl } = await req.json();

  const profile = await currentProfile();

  if (!profile) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!params.serverId) {
    return new NextResponse("Missing Server Id", { status: 400 });
  }
  try {
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });
    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }
    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Missing Server Id", { status: 400 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse(`Internal Server Error:  ${error}`, {
      status: 500,
    });
  }
}
