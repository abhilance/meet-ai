import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { streamVideo } from "@/lib/stream-video";
import { CallSessionParticipantLeftEvent, CallSessionStartedEvent } from "@stream-io/node-sdk";
import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

function verifySinatureWithSDK(body:string, signature:string):boolean{
    return streamVideo.verifyWebhook(body,signature);
}
export async function POST(req:NextRequest){
    const signature=req.headers.get("x-signature")
    const apiKey=req.headers.get("x-api-key");

    if(!signature || !apiKey){
        return NextResponse.json(
            {
                error:"Missing signature or API"

            },
            {
                status:400
            }
        )
    }
    const body= await req.text()
    if(!verifySinatureWithSDK(body, signature)){
        return NextResponse.json({error:"Invalid signature"},{status:401});

    }
    let payload:unknown;
    try{
        payload=JSON.parse(body)as Record<string, unknown>;
    }catch{
        return NextResponse.json({error: "Invalid JSON"}, {status:401});
    }
        const eventType=(payload as Record<string, unknown>)?.type;
        try {
                if(eventType==="call.session_started"){
                        const event= payload as CallSessionStartedEvent;
                        const meetingId= event.call.custom?.meetingId;

                        if(!meetingId){
                                return NextResponse.json({error:"Missing meetingId"},{status:400})
                        }

                        const [existingMeetings] = await db
                        .select()
                                .from(meetings)
                                .where(
                                    and(
                                        eq(meetings.id, meetingId),
                                        not(eq(meetings.status, "active")),
                                        not(eq(meetings.status, "completed")),
                                        not(eq(meetings.status, "cancelled")),
                                        not(eq(meetings.status, "processing"))
                                    ))
            if (!existingMeetings) {
                            return NextResponse.json({ status: "ignored", reason: "Meeting not found or already processed" })
            }
            
         
            
            await db.update(meetings)
            .set({
                status: "active",
                startedAt:new Date(),
            })
            .where(eq(meetings.id, meetingId))
            const [existingAgent] = await db
            .select()
                .from(agents)
                .where(eq(agents.id, existingMeetings.agentId))
        
            if (!existingAgent) {
              return NextResponse.json({ status: "ignored", reason: "Agent not found" })
            }
            const openAiApiKey = process.env.OPENAI_API_KEY;
            if (!openAiApiKey) {
                return NextResponse.json({ status: "ignored", reason: "OPENAI_API_KEY missing" });
            }
            const call = streamVideo.video.call("default",meetingId);
            const realtimeClient= await streamVideo.video.connectOpenAi({
                call,
                openAiApiKey,
                agentUserId : existingAgent.id,
            });
            await realtimeClient.updateSession({
                instructions: existingAgent.instructions,

            })
        } else if(eventType==="call.session_participants_left"){
            const event = payload as CallSessionParticipantLeftEvent;
            const meetingId= event.call_cid.split(":")[1];

            if(!meetingId){
                return NextResponse.json({error:"missing meetingID"},{status:400});
            }
           const call = streamVideo.video.call("default",meetingId);
           await call.end()  
        }
    } catch (error) {
        console.error("Webhook processing failed", { eventType, error });
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
    return NextResponse.json({status:"ok"})
}