import { createContext, useState } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
  });

  const updateUserName = (newName) => {
    setUser((prev) => ({
      ...prev,
      name: newName,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUserName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
