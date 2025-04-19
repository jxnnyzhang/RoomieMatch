"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextValue {
  userId: number | null;
  setUserId: (id: number) => void;
}

const UserContext = createContext<UserContextValue>({
  userId: null,
  setUserId: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
