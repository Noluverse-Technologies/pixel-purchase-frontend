import React from "react";
import { useState, useEffect } from "react";

function Message({message,cloassprop}) {

const [messageprop, setMessage] = useState(message);
const [classproperty, setClassproperty] = useState(cloassprop);

useEffect(() => {
    setClassproperty(cloassprop);
}
, [classproperty]);

useEffect(() => {
    setClassproperty(message);
}
, [messageprop]);


  return (
    <>
      <span align="center" >{message}</span>
    </>
  );
}

export default Message;
