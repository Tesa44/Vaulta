import { createContext, useCallback, useContext, useReducer } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

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

const FAKE_USER = {
  id: 1,
  name: "Jan",
  surname: "Kowalski",
  email: "kowalski@gmail.com",
  password: "12345",
};

const initialState = {
  user: FAKE_USER,
  isAuthenticated: false,
  loading: "",
  error: "",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function login(email, password) {
    dispatch({ type: "loading" });
    try {
      const body = new URLSearchParams({
        username: email,
        password,
        grant_type: "password",
      });

      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Login error:", res.status, errorText);
        throw new Error(errorText);
      }
      const tokenData = await res.json();
      const token = tokenData.access_token;
      localStorage.setItem("token", token);

      const user = await fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await user.json();
      console.log("Login success");
      console.log(userData);

      dispatch({ type: "auth/login", payload: userData });
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
      const res = await fetch(`${BASE_URL}/users`);
      const users = await res.json();
      const exist = users.some((u) => u.email === email);

      if (exist) {
        throw new Error("User already exists");
      }

      const newUser = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password }),
      });

      const newUserData = await newUser.json();
      console.log(user);
      console.log(newUserData);
    } catch (err) {
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  const clearError = useCallback(function () {
    dispatch({ type: "clearError" });
  }, []);

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
