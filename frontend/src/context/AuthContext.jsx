import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] = useState([]);

  const logout = () => {
    setUser(null);
    setEnrollments([]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        enrollments,
        setEnrollments,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}