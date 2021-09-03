import Link from "next/link";
import { ColourLogo } from "./UI/Icons";

import classes from "./Nav.module.scss";

const labels = [
  { route: "/onboarding", label: "Onboarding", icon: "skateboarding" },
  { route: "/browse", label: "Browse", icon: "camera_roll" },
  { route: "my-account", label: "My Account", icon: "person" },
  {
    route: "/admin-console",
    label: "Admin Console",
    icon: "admin_panel_settings",
  },
  { route: "/faq", label: "FAQ", icon: "help_outline" },
];

const Nav = ({ tabIndex, collapseNav }) => {
  return (
    <nav className={`${classes.nav} ${collapseNav ? classes.collapse : ""}`}>
      <ColourLogo width="131.25" height="24" />
      <div className={classes.menu}>
        {labels.map((l, i) => (
          <Link key={i} href={l.route}>
            <button
              className={`${classes.tab} ${
                tabIndex === i ? classes.active : ""
              }`}
            >
              <i className="material-icons-outlined">{l.icon}</i>
              {l.label}
            </button>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
