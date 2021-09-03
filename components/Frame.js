import { useState } from "react";
import classes from "./Frame.module.scss";
import Header from "./Header";
import Nav from "./Nav";

const Frame = ({ children, tabIndex, session, type, org, name }) => {
  const [collapseNav, setCollapseNav] = useState(false);

  const toggleNavHandler = () => {
    setCollapseNav((state) => !state);
  };

  return (
    <div className={classes.frame}>
      <div className={classes.nav}>
        <Nav tabIndex={tabIndex} collapseNav={collapseNav} />
      </div>
      <div className={classes.view}>
        <div className={classes.header}>
          <Header
            session={session}
            type={type}
            org={org}
            name={name}
            collapseNav={collapseNav}
            toggleNavHandler={toggleNavHandler}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Frame;
