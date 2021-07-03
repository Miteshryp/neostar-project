import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider(props) {
  const [user, setUser] = useState({
    email: "",
    name: "",
  });

  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
}
