"use client";

import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(() => {
    // Initialize user from localStorage or default to null
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userToken");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  });

  const [username, setUsername] = useState(() => {
    // Initialize user from localStorage or default to null
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("username");
      return storedUser ? JSON.parse(storedUser) : null;
    }
  });

  const [userId, setUserId] = useState(() => {
    // Initialize user from localStorage or default to null
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      return storedUserId ? JSON.parse(storedUserId) : null;
    }
  });

  useEffect(() => {
    // Store user in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("userToken", JSON.stringify(userToken));
    }
  }, [userToken]);

  useEffect(() => {
    // Store user in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("username", JSON.stringify(username));
    }
  }, [username]);

  useEffect(() => {
    // Store user in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("userId", JSON.stringify(userId));
    }
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        userToken,
        setUserToken,
        userId,
        setUserId,
        username,
        setUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
