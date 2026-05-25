"use client";

import LoaderUI from "@/components/LoaderUI";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import useGetCallById from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";

function MeetingPage() {
  const fullBleedClassName = "-mx-4 -my-8 sm:-mx-6 lg:-mx-8";
  const { id } = useParams<{ id: string }>();
  const { isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(id);

  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallLoading) {
    return (
      <div className={fullBleedClassName}>
        <LoaderUI />
      </div>
    );
  }

  if (!call) {
    return (
      <div className={fullBleedClassName}>
        <div className="flex h-[calc(100dvh-4rem-1px)] items-center justify-center">
          <p className="text-2xl font-semibold">Meeting not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={fullBleedClassName}>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </div>
  );
}
export default MeetingPage;
