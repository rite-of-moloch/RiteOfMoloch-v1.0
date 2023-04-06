import React, { Dispatch, createContext, useState } from "react";

export const UserContext = createContext<{
  willSponsor: boolean;
  handleWillSponsor: Dispatch<boolean>;
}>({
  willSponsor: false,
  handleWillSponsor: useState,
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [willSponsor, setWillSponsor] = useState<boolean>(false);

  const handleWillSponsor = (): void => {
    setWillSponsor(!willSponsor);
  };

  const value = {
    willSponsor,
    handleWillSponsor,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
