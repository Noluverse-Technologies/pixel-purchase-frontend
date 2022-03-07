import React from "react";
import { useState, useEffect } from "react";

function Message({message,cloassprop}) {

const [messageprop, setMessage] = useState(message);
const [classproperty, setClassproperty] = useState(cloassprop);




  return (
    <>
      {<small style={{marginLeft: "4.3rem"}}>{message}</small>}
    </>
  );
}

export default Message;
