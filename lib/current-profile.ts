import { auth } from "@clerk/nextjs";

import { db } from "./db";
import { NextResponse } from "next/server";


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