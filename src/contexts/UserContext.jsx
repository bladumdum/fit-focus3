import React, { createContext, useContext, useState, useCallback } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Alex",
    username: "@AlexKiboy",
    email: "AlexKiboy2130@gmail.com",
    avatar: null, // path to avatar image or null for default mascot
  });

  const updateUser = useCallback((fields) => {
    setUser((prev) => ({ ...prev, ...fields }));
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserContext;
