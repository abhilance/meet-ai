import Link from "next/link";
import Image from "next/image";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";

interface Props {
    onLeave: () => void;
    meetingName: string
}
export const CallActive = ({ onLeave, meetingName }: Props) => {
    return (
        <div className="flex h-full flex-col gap-4 p-4 text-white">
            <div className="shrink-0 rounded-lg bg-[#101213] p-4 text-white">
                <Link href="/" className="flex items-center justify-center p-1 bg-white/10 rounded-full w-fit">
                    <Image src="/logo.svg" width={22} height={22} alt="logo" />
                </Link>
                <h4 className="text-base">
                    {meetingName}
                </h4>
            </div>
            <div className="min-h-0 flex-1">
                <SpeakerLayout />
            </div>
            <div className="shrink-0 rounded-lg bg-[#101213] px-4 py-2">
                <CallControls onLeave={onLeave} />
            </div>

        </div>
    )
}