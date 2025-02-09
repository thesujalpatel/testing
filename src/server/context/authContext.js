import { createContext, useState, useEffect, useRef } from "react";
import supabase from "../supabase";
import userServices from "../services/userServices";
import Preloader from "../../views/other/Preloader";

export const Context = createContext();

function AuthContext({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true); // Track initial load
  const unsubRef = useRef(null);

  useEffect(() => {
    let timeoutId; // Store timeout ID

    const handleAuthChange = async (_, session) => {
      if (session?.user) {
        try {
          const userData = await userServices.getUser(session.user.id);
          if (userData && userData.role) {
            session.user.userRole = userData.role;
          }
          setUser(session.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null); // Important: Clear user on error
        }
      } else {
        setUser(null);
      }

      setInitialLoad(false); // Initial auth check complete

      // Set a minimum display time of 2 seconds
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    try {
      unsubRef.current = supabase.auth.onAuthStateChange(handleAuthChange);
    } catch (error) {
      console.error("Error in onAuthStateChange:", error);
      setInitialLoad(false); // Ensure loading is eventually set to false even on error
      setLoading(false);
      setUser(null);
    }

    return () => {
      if (typeof unsubRef.current === "function") {
        unsubRef.current();
      }
      clearTimeout(timeoutId); // Clear timeout if component unmounts
    };
  }, []);

  const values = {
    user,
    setUser,
  };

  const handleLoaded = () => {
    console.log("Preloader animation complete. Transitioning to main content.");
  };

  // Conditionally render the preloader based on initialLoad OR loading
  const showPreloader = initialLoad || loading;

  return (
    <>
      <Preloader isLoading={showPreloader} onLoaded={handleLoaded} />
      <Context.Provider value={values}>
        {!showPreloader && children}
      </Context.Provider>
    </>
  );
}

export default AuthContext;
