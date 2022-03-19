import React from "react"
import Image from "next/image"
import classes from "./EducationalContent.module.scss"

const EducationalContent = (contentType) => {
  return (
    <div className={classes.edContentContainer}>
        <div className={classes.sideNav}>
            <button className={`${classes.sideNavItem} ${classes.active}`}>
                <h4>Group Content</h4>
            </button>
            <button className={`${classes.sideNavItem} ${classes.inActive}`}>
                <h4>Group Content</h4>
            </button>
            <button className={`${classes.sideNavItem} ${classes.inActive}`}>
                <h4>Group Content</h4>
            </button>
        </div>
        <div className={classes.contentContainer}>
            <div className={classes.contentHeader}>
                <div className={classes.title}>
                    <h2>Define</h2>
                </div>
                <div className={classes.subTitle}>
                    <h3>The line-following robot</h3>
                </div>
            </div>
            <div className={classes.mainContent}>
                <p>An overloaded electrical circuit has resulted in a wooden pallet catching fire inside a warehouse! Explosive hydrogen fuel cells are located inside, posing a danger to any firefighters who would enter the warehouse.</p>
                <p>Sending human fire-fighters into the warehouse would be extremely dangerous as there is a risk that an explosion could occur at any time. Luckily, this warehouse utilizes line-following robots to move items around. Maybe we could program one of them to find and put out the fires safely...</p>
                <div className={classes.imageContainer}>
                    <Image
                        src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/heat-seeker/images/define.jpg"
                        layout="fill" 
                        objectFit="contain"
                    />
                </div>
                <p>Sending human fire-fighters into the warehouse would be extremely dangerous as there is a risk that an explosion could occur at any time. Luckily, this warehouse utilizes line-following robots to move items around. Maybe we could program one of them to find and put out the fires safely...</p>
                <div className={classes.imageContainer}>
                    <Image
                        src="https://raw.githubusercontent.com/CreateBaseNZ/public/dev/projects/heat-seeker/images/subsystem-1.png"
                        layout="fill" 
                        objectFit="contain"
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default EducationalContent