import Header from "../Header/Header";

import classes from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <div className={`${classes.layout} ${props.className}`}>
      <Header />
      {props.children}
    </div>
  );
};

export default Layout;
