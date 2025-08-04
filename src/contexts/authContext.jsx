import { createContext, useContext, useReducer } from "react";

const BASE_URL = "http://localhost:8000";

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };

    case "auth/login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: "",
      };

    case "auth/logout":
      return { ...state, user: null, isAuthenticated: false, loading: false };

    case "rejected":
      return { ...state, error: action.payload, loading: false };

    case "clearError": {
      return { ...state, error: "" };
    }

    default:
      throw new Error("Unknown action type");
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: "",
  error: "",
};

// const FAKE_USER = {
//   id: 1,
//   name: "Jan",
//   surname: "Kowalski",
//   email: "kowalski@gmail.com",
//   password: "12345",
//      avatar: "https://i.pravatar.cc/100?u=zz",
// };

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email, password) {
    // console.log(email, password);
    // if (email === FAKE_USER.email && password === FAKE_USER.password) {
    //   dispatch({ type: "login", payload: FAKE_USER });
    // }
    dispatch({ type: "loading" });
    try {
      const res = await fetch(
        `${BASE_URL}/users?email=${email}&password=${password}`
      );
      const users = await res.json();

      if (users.length === 0) {
        throw new Error("Invalid credentials");
      }
      dispatch({ type: "auth/login", payload: users[0] });
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  function logout() {
    dispatch({ type: "auth/logout" });
  }

  async function register(user) {
    const { name, surname, email, password } = user;
    dispatch({ type: "loading" });
    try {
      // Sprawdź, czy użytkownik już istnieje
      const existing = await fetch(`${BASE_URL}/users?email=${email}`);
      const found = await existing.json();

      if (found.length > 0) {
        throw new Error("User already exists");
      }

      // Dodaj nowego użytkownika
      const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password }),
      });

      const newUser = await res.json();

      dispatch({ type: "auth/login", payload: newUser });

      //   return newUser;
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  function clearError() {
    dispatch({ type: "clearError" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        error,
        loading,
        register,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside  AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
