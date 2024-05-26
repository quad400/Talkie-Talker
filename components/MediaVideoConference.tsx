"use client"

import { GridLayout, ParticipantTile, useTracks } from "@livekit/components-react"
import {Track} from "livekit-client"

export const MediaVideoConference = ()=> {

    const tracks = useTracks([
        {
            source: Track.Source.Camera, withPlaceholder: true
        },
        {
            source: Track.Source.ScreenShare, withPlaceholder: false
        }
    ],{onlySubscribed: false})

    return (
        <GridLayout tracks={tracks} style={{height: 'calc(100vh - var(--lk-control-bar-height))'}}>
            <ParticipantTile />
        </GridLayout>
    )
}