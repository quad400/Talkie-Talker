import { currentProfile } from "@/lib/current-profile";
import { Profile } from "@prisma/client";

export const useOtherProfile = async ( profile: Profile ) => {
  const userProfile = await currentProfile();

  if (!userProfile) {
    return null;
  }

  if (userProfile.email === profile.email) {
    return null;
  }

  return profile;
};
