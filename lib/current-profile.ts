import { auth } from "@clerk/nextjs";
import { db } from "./db";

export default function currentProfile(){

    const {userId} = auth()

    if (!userId){
        return null
    }
    const profile = db.profile.findUnique({
        where: {
            userId: userId
        }
    })

    return profile
}