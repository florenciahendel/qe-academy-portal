import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("qe-user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "qe-user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("qe-user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    setEnrollments([]);

    localStorage.removeItem("qe-user");
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