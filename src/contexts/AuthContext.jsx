import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; // Ensure this path is correct

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initial loading state

  useEffect(() => {
    let mounted = true; // To prevent state updates on unmounted component

    async function getInitialSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (mounted) {
          setUser(session?.user || null);
        }
      } catch (error) {
        console.error("Error getting initial session:", error.message);
        if (mounted) {
          setUser(null); // Ensure user is null on error
        }
      } finally {
        if (mounted) {
          setLoading(false); // Always set loading to false after attempt
        }
      }
    }

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (mounted) {
          setUser(session?.user || null);
          setLoading(false); // Ensure loading is false on auth state change
        }
      }
    );

    return () => {
      mounted = false; // Cleanup for unmounted component
      authListener?.unsubscribe(); // Unsubscribe from auth changes
    };
  }, []); // Empty dependency array to run only once on mount

  const value = {
    user,
    loading,
    signIn: async (email, password) => {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      return { data, error };
    },
    signOut: async () => {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      setLoading(false);
      return { error };
    },
    signUp: async (email, password) => {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      return { data, error };
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
