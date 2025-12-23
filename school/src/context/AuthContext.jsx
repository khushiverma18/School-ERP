import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Mock login function
  const login = (email, password) => {
    const mockUsers = [
      { name: "admin", email: "admin@gmail.com", password: "admin@123", role: "admin" },
      { name: "khushi", email: "khushi@gmail.com", password: "khushi@123", role: "student" },
      { name: "teacher", email: "teacher@gmail.com", password: "teacher@123", role: "teacher" },
      { name: "parent", email: "parent@gmail.com", password: "parent@123", role: "parent" }
    ];

    const foundUser = mockUsers.find(user => 
      user.email === email && user.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);