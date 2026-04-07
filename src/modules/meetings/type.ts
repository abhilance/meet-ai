import {inferRouterOutputs} from "@trpc/server"
import type { AppRouter } from "@/trpc/routers/_app"

export type MeetingsGetMany = inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"]
export type MeetingsGetOne = inferRouterOutputs<AppRouter>["meetings"]["getOne"] 

export enum MeetingStatus{
  upcoming ="upcoming",
  active ="active",
  completed ="completed",
  processing="processing",
  cancelled ="cancelled"
}
export type StreamTranscriptItem={
  speaker_id: string;
  type : string;
  text: string;
  start_ts:number;
  stop_ts:number;
}; 