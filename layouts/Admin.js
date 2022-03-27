import React from "react";
import { useRouter } from "next/router";
// reactstrap Components
import { Container } from "reactstrap";
// core Components
import AdminNavbar from "Components/Navbars/AdminNavbar.js";
import AdminFooter from "Components/Footers/AdminFooter.js";
import Sidebar from "Components/Sidebar/Sidebar.js";
// authProtection

import routes from "routes.js";
import AuthProtection from "../Components/Auth/AuthProtection";

function Admin(props) {
  // used for checking current route
  const router = useRouter();
  let mainContentRef = React.createRef();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, []);
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (router.route.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("assets/img/brand/nextjs_argon_black.png"),
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar {...props} brandText={getBrandText()} />
        {props.children}
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  );
}

export default AuthProtection(Admin);
