import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
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
        profileId: {
          not: profile.id,
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
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
