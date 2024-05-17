import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Server, Member, Profile, Channel, Message } from "@prisma/client";

export type ServerWithMemberWithProfile = Server & {
  members: (Member & { profile: Profile })[];
};

export type ServerWIthMember = Server & {
  members: Member[];
};

export type ServerWithMemberAndChannel = Server & {
  members: Member[];
  channels: Channel[];
};

export type MemberWithProfile = Member & {
  profile: Profile;
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

