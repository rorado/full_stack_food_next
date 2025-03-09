"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useCLientSession = (initialSesssion?: Session | null) => {
  const { data: session, status, update } = useSession();
  const [currentSession, setCurrentSession] = useState(
    initialSesssion ?? session
  );

  useEffect(() => {
    if (initialSesssion) {
      setCurrentSession(initialSesssion);
    }
  }, [initialSesssion]);

  useEffect(() => {
    setCurrentSession(session);
  }, [session]);

  return { data: currentSession, status, update };
};
