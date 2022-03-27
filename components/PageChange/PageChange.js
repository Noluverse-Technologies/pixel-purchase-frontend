import React from "react";

// reactstrap Components
import { Spinner } from "reactstrap";

// core Components

export default function PageChange(props) {
  return (
    <div>
      <div className="page-transition-wrapper-div">
        <div className="page-transition-icon-wrapper mb-3">
          <Spinner
            color="white"
            style={{ width: "6rem", height: "6rem", borderWidth: ".3rem" }}
          />
        </div>
        <h2 className="title text-white">
          Loading ...
        </h2>
      </div>
    </div>
  );
}
