import React, { createContext, useState } from "react";

export const UserContext = createContext<{
  willSponsor: boolean;
  handleWillSponsor: any;
}>({
  willSponsor: false,
  handleWillSponsor: null,
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // console.log("USERPROVIDER")
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
