import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (userAuthed) => {
      setUser(userAuthed);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return { isLoading, user };
};

export default useUser;
