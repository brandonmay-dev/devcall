import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutListIcon, LoaderIcon, UsersIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import EndCallButton from "./EndCallButton";
import CodeEditor from "./CodeEditor";

function MeetingRoom() {
  const router = useRouter();
  const [layout, setLayout] = useState<"grid" | "speaker">("speaker");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState, useLocalParticipant } = useCallStateHooks();

  const callingState = useCallCallingState();
  const localParticipant = useLocalParticipant();

  if (
    callingState === CallingState.JOINING &&
    !localParticipant
  ) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoaderIcon className="size-6 animate-spin" />
      </div>
    );
  }

  if (
    callingState === CallingState.LEFT ||
    callingState === CallingState.RECONNECTING_FAILED ||
    callingState === CallingState.OFFLINE
  ) {
    return (
      <div className="h-96 flex items-center justify-center px-6 text-center">
        <div className="space-y-2">
          <p className="text-lg font-semibold">Meeting connection lost</p>
          <p className="text-sm text-muted-foreground">
            Rejoin the meeting to continue.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100dvh-4rem-1px)]">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel
          defaultSize="35%"
          minSize="25%"
          maxSize="100%"
          className="relative"
        >
          {/* VIDEO LAYOUT */}
          <div className="absolute inset-0">
            {layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />}

            {/* PARTICIPANTS LIST OVERLAY */}
            {showParticipants && (
              <div className="absolute right-0 top-0 h-full w-75 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
                <CallParticipantsList
                  onClose={() => setShowParticipants(false)}
                />
              </div>
            )}
          </div>

          {/* VIDEO CONTROLS */}

          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex flex-col items-center gap-4">
              {(callingState === CallingState.RECONNECTING ||
                callingState === CallingState.MIGRATING) && (
                <div className="rounded-full bg-background/90 px-3 py-1 text-sm text-muted-foreground shadow-xs ring-1 ring-border">
                  Reconnecting...
                </div>
              )}
              <div className="flex items-center gap-2 flex-wrap justify-center px-4">
                <CallControls onLeave={() => router.push("/")} />

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="size-10">
                        <LayoutListIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setLayout("grid")}>
                        Grid View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLayout("speaker")}>
                        Speaker View
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    variant="outline"
                    size="icon"
                    className="size-10"
                    onClick={() => setShowParticipants(!showParticipants)}
                  >
                    <UsersIcon className="size-4" />
                  </Button>

                  <EndCallButton />
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize="65%" minSize="25%">
          <CodeEditor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
export default MeetingRoom;
