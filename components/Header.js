import { ColourLogo } from "./UI/Icons";

import classes from "./Header.module.scss";

const Header = ({ type }) => {
  return (
    <header className={classes.header}>
      <ColourLogo />
      <div className={`${classes.avatar} ${classes[type]}`}>
        <i className="material-icons-outlined">
          {" "}
          {type === "admin"
            ? "verified_user"
            : user.type === "educator"
            ? "school"
            : "backpack"}
        </i>
      </div>
    </header>
  );
};

export default Header;
