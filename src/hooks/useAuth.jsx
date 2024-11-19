import { useContext, createContext, useState, useEffect } from "react";

const initialState = {
  isLoggedIn: false,
  token: null,
  user: null,
};
const authContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : initialState
  );
  const login = (data) => {
    setUser({
      isLoggedIn: true,
      token: "x1x1x1",
      user: data,
    });
  };
  const logout = () => {
    setUser(initialState);
  };

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, [user]);
  return (
    <authContext.Provider value={{ user, logout, login }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within useAuth");
  }
  return context;
};
