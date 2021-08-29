import { useState } from "react";
import router from "next/router";
import Link from "next/link";
import { ColourLogo } from "./UI/Icons";
import { signOut } from "next-auth/client";

import classes from "./Header.module.scss";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "./UI/Buttons";

const Header = ({ session, type, org, name = "" }) => {
  const [active, setActive] = useState(false);

  return (
    <header className={classes.header}>
      <ColourLogo />
      <Link href="/faq">
        <button className={classes.help} title="FAQ">
          ?
        </button>
      </Link>
      <Link href="/browse">
        <TertiaryButton
          className={classes.browse}
          title="Browse projects"
          mainLabel="Browse projects"
        />
      </Link>
      {session ? (
        type && (
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
              {/* //TODO <div className={classes.name}>Hi, {name.split(" ")[0]}</div> */}
              <div className={classes.name}>Hello, User</div>
              <div className={classes.divider} />
              {type === "admin" && org && (
                <button onMouseDown={() => router.push("/user/console")}>
                  <i className="material-icons-outlined">
                    admin_panel_settings
                  </i>
                  Admin console
                </button>
              )}
              {(type === "admin" || type === "create") && !org && (
                <>
                  <button onMouseDown={() => router.push("/user")}>
                    <i className="material-icons-outlined">group_add</i> Join an
                    org
                  </button>
                  <button onMouseDown={() => router.push("/user")}>
                    <i className="material-icons-outlined">groups</i>Create an
                    org
                  </button>
                </>
              )}
              <button onMouseDown={() => router.push("/user")}>
                <i className="material-icons-outlined">assignment_ind</i>My
                account
              </button>
              <div className={classes.divider} />
              <button onMouseDown={() => signOut()}>
                <i className="material-icons-outlined">logout</i>Sign out
              </button>
            </div>
          </div>
        )
      ) : (
        <div className={classes.auth}>
          <Link href="/auth/signup">
            <div>
              <PrimaryButton className={classes.signUp} mainLabel="Sign up" />
            </div>
          </Link>
          <Link href="/auth/login">
            <div>
              <SecondaryButton className={classes.logIn} mainLabel="Log in" />
            </div>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
