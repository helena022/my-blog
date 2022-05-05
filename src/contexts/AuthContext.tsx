import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../api/supabase';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const session = supabase.auth.session();

  useEffect(() => {
    setUser(session?.user ?? null);
    setLoading(false);

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const value = {
    signUp: (data: object) => supabase.auth.signUp(data),
    signIn: (data: object) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
    session,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
