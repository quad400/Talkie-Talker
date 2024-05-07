import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  const { searchParams } = new URL(req.url);

  const { role } = await req.json();

  const serverId = searchParams.get("serverId");

  const profile = await currentProfile();

  if (!profile) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!serverId) {
    return new NextResponse("Missing Server Id", { status: 404 });
  }

  if (!params.memberId) {
    return new NextResponse("Missing Member Id", { status: 404 });
  }

  try {
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            id: params.memberId,
          },
        },
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role: role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  const { searchParams } = new URL(req.url);

  const serverId = searchParams.get("serverId");

  const profile = await currentProfile();

  if (!profile) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!serverId) {
    return new NextResponse("Missing Server Id", { status: 404 });
  }

  if (!params.memberId) {
    return new NextResponse("Missing Member Id", { status: 404 });
  }

  try {
    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    if (!server) {
      return new NextResponse("Server Not Found", { status: 404 });
    }

    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse(`Internal Server Error ${error}`, { status: 500 });
  }
}
