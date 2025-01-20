import React, { createContext, useContext, useReducer } from 'react';


// Create the AuthContext
const AuthContext = createContext();

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };

      case 'UPDATE_USER':
        return {
          ...state,
          user: { ...state.user, ...action.payload.user },
        };

    default:
      return state;
  }
};

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Handle login
  const login = async (user, token,email) => {
     localStorage.setItem('user', JSON.stringify(user));
     localStorage.setItem('token', token);
     localStorage.setItem('userEmail', email);
    dispatch({ type: 'LOGIN', payload: { user, token } });
  };

  // Handle logout
  const logout = async () => {
     localStorage.removeItem('user');
     localStorage.removeItem('token');
     localStorage.removeItem('userEmail');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = async (updatedUser) => {
     localStorage.setItem('user', JSON.stringify(updatedUser));
    dispatch({ type: 'UPDATE_USER', payload: { user: updatedUser } });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
