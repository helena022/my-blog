import React, { useContext, useState, useEffect } from 'react';
import { supabase } from '../api/supabase';

const ProfileContext = React.createContext(null);

export function ProfileProvider({ children }) {
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const session = supabase.auth.session();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, avatar_url, website, bio')
        .eq('id', session.user.id)
        .single();
      if (error && status !== 400) {
        throw error;
      }
      if (data) {
        setProfileData(data);
      }
    } catch (error) {
      // TODO error handling
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const value = {
    fetchProfile: () => fetchProfile(),
    profileData,
  };

  return <ProfileContext.Provider value={value}>{!isLoading && children}</ProfileContext.Provider>;
}

export function useProfileContext() {
  return useContext(ProfileContext);
}
