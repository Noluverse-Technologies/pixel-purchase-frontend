import router, { useRouter } from "next/router";
import { useState } from "react";

const authProtection = (WrappedComponent) => {

  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const router = useRouter();

      const authToken = localStorage.getItem("authToken");

      // If there is no access token we redirect to "/" page.
      if (!authToken) {

        router.replace("/auth/login");  
        return null;
      }

      
      

      // If this is an authToken we just render the component that was passed with all its props
      return <WrappedComponent {...props} />;

    }

    // If we are on server, return null
    return null;
  };
};

export default authProtection;