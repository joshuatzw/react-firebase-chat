import React, {createContext, useState} from 'react';
import { loginWithGoogle } from '../services/firebase';

const AuthContext = createContext({
  user: null,
  login: (()=>null)
});

function AuthProvider(props) {
  const [user, setUser] = useState(null);

  async function login() {
    const user = await loginWithGoogle();

    if (!user) {
      // TODO: Handle failed login
    }

    setUser(user);
  };

  const value = { user, login }

  return <AuthContext.Provider value={value} {...props} />
};

export { AuthContext, AuthProvider }