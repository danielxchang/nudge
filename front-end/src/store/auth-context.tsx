import React, { useState, useEffect, useCallback } from "react";

interface AuthContextType {
  token: string | null | undefined;
  isLoggedIn: boolean;
  login: (token: string, expirationTime: string) => void;
  logout: () => void;
}

interface ContextProviderProps {
  children: React.ReactNode;
}

let logoutTimer: NodeJS.Timeout;

const clearLocalStorage = (...items: string[]) => {
  items.forEach((item) => localStorage.removeItem(item));
};

const calculateRemainingTime = (expirationTime: string) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate!);

  if (remainingTime <= 60000) {
    clearLocalStorage("token", "expirationTime");
    return null;
  }

  return { token: storedToken, duration: remainingTime };
};

const AuthContext = React.createContext<AuthContextType>({
  token: "",
  isLoggedIn: false,
  login: (token, expirationTime) => {},
  logout: () => {},
});

export const AuthContextProvider: React.FC<ContextProviderProps> = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;

  if (tokenData) initialToken = tokenData.token;

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    clearLocalStorage("token", "expirationTime");

    if (logoutTimer) clearTimeout(logoutTimer);
  }, []);

  const loginHandler = useCallback(
    (token: string, expirationTime: string) => {
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);
      const remainingTime = calculateRemainingTime(expirationTime);

      logoutTimer = setTimeout(logoutHandler, remainingTime);
    },
    [logoutHandler]
  );

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: initialToken,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
