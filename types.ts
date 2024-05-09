import { Server, Member, Profile, Channel } from "@prisma/client";

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
  profile: Profile
}