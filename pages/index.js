import React, { Component, useState, useEffect } from "react";
useState
import { useRouter } from "next/router";

export default function Index() {

  const router=useRouter();
  const [authorized, setAuthorized] = useState(false);
  
  React.useEffect(() => {
    if(localStorage.getItem("authToken")){
      router.push("/dashboard");
    }
    router.push("/auth/login");
  });

  return <div />;
}



