import { createContext, useContext, useState, useEffect } from "react";
import { instance } from "./api"; // This import should work now

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await instance.get("/auth/check");
        setCurrentUser(response.data.user);
      } catch (error) {
        console.log("Not authenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const logout = async () => {
    try {
      console.log(currentUser);
      await instance.post("/auth/logout");
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
