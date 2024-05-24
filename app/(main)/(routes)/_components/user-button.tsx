"use client";

import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const UserButtonComp = () => {
  const { theme } = useTheme();

  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  return (
    <UserButton
      afterSignOutUrl="/"
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          avatarBox: "h-[48px] w-[48px]",
        },
      }}
    />
  );
};

export default UserButtonComp;
