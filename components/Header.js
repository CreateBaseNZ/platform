import { useState } from "react";
import router from "next/router";
import { ColourLogo } from "./UI/Icons";
import { signOut } from "next-auth/client";

import classes from "./Header.module.scss";

const Header = ({ type, org }) => {
  const [active, setActive] = useState(false);

  console.log(active);

  return (
    <header className={classes.header}>
      <ColourLogo />
      <div
        className={classes.avatar}
        tabIndex={-1}
        onBlur={() => setActive(false)}
      >
        <div
          className={`${classes.icon} ${classes[type]} ${
            active ? classes.active : ""
          }`}
          onClick={() => setActive((state) => !state)}
        >
          <i className="material-icons-outlined">
            {type === "admin"
              ? "verified_user"
              : type === "educator"
              ? "school"
              : "backpack"}
          </i>
        </div>
        <div className={`${classes.menu} ${active ? classes.active : ""}`}>
          {type === "admin" && org && (
            <button onMouseDown={() => router.push("/user/console")}>
              <i className="material-icons-outlined">admin_panel_settings</i>
              Admin console
            </button>
          )}
          {(type === "admin" || type === "create") && !org && (
            <>
              <button onMouseDown={() => router.push("/user")}>
                <i className="material-icons-outlined">group_add</i> Join an org
              </button>
              <button onMouseDown={() => router.push("/user")}>
                <i className="material-icons-outlined">groups</i>Create an org
              </button>
            </>
          )}
          <button onMouseDown={() => router.push("/user")}>
            <i className="material-icons-outlined">assignment_ind</i>My account
          </button>
          <div className={classes.divider} />
          <button onMouseDown={() => signOut()}>
            <i className="material-icons-outlined">logout</i>Sign out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
