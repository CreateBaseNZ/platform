import React from "react"
import classes from "./Share.module.scss"
import {FBIcon, TwitterIcon} from "../UI/Icons"

const copyToClipboard = () => {
    let copyText = document.getElementById("myInput");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
}

const Share = () => {
  return (
    <div className={classes.shareContainer}>
        <div className={classes.titleContainer}>
            <div className={classes.title}>
                <h2>Share this weekly challenge and challenge a friend!</h2>
            </div>
            <div className={classes.spacer}></div>
            <div className={classes.exitModal}>
                <button><span className="material-icons-outlined">close</span></button>
            </div>
        </div>
        <div className={classes.contentContainer}>
            <div className={classes.share}>
                <div className={classes.clipboardContent}>
                    <p>I just scored <span>13304pts</span> on the CreateBase Heat Seeker Weekly Challenge. Try beat me!</p>
                    <p>https://challenge.createbase.co.nz/</p>
                </div>
            </div>
            <div className={classes.btnContainer}>
                <div className={classes.socialBtnContainer}>
                    <button className={classes.sharesocialShareBtnContainer}>
					    <FBIcon className={classes.socialIcon} height="30" width="30" iconHeight="30" iconWidth="30"/>
                    </button>
                    <button className={classes.sharesocialShareBtnContainer}>
                        <TwitterIcon className={classes.socialIcon} height="30" width="30" iconHeight="30" iconWidth="30"/>
                    </button>
                    <button className={classes.sharesocialShareBtnContainer}>
                        <span className="material-icons">email</span>
                    </button>
                </div>
                <button className={`${classes.copyBtn} ${classes.CTAbtn}`}>
                    <p>Copy to clipboard</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Share