import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import classes from "/styles/exploreView.module.scss";
import Boost from "../../components/Minigames/Boost";

const ExploreView = ({ setLoaded }) => {
  const router = useRouter();
  const [view, setView] = useState();

  console.log("explore changed");

  useEffect(() => {
    console.log(router.query);
    if (Object.keys(router.query).length) {
      setView(router.query.exploreView[0]);
    } else {
      setView("explore");
    }
  }, [router.query]);

  const renderView = () => {
    switch (view) {
      case "comparison-boost":
        return <Boost mode="Comparison" setLoaded={setLoaded} />;
      default:
        // return <Explore />
        return null;
    }
  };

  return <div className={classes.exploreView}>{renderView()}</div>;
};

export default ExploreView;
