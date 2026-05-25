"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import LoaderUI from "../LoaderUI";
import { streamTokenProvider } from "@/actions/stream.actions";

const StreamClientProvider = ({ children }: { children: ReactNode }) => {
  const [streamVideoClient, setStreamVideoClient] =
    useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();
  const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const userId = user?.id;
  const userName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() ||
    userId;
  const userImage = user?.imageUrl;

  useEffect(() => {
    if (!isLoaded || !apiKey || !userId) return;

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: streamTokenProvider,
    });

    setStreamVideoClient(client);

    return () => {
      client
        .disconnectUser()
        .catch((error) =>
          console.error("Failed to disconnect Stream user:", error),
        );
      setStreamVideoClient(undefined);
    };
  }, [apiKey, isLoaded, userId, userImage, userName]);

  if (!streamVideoClient) return <LoaderUI />;

  return <StreamVideo client={streamVideoClient}>{children}</StreamVideo>;
};

export default StreamClientProvider;
