import { useContext, useEffect, useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { SecondaryButton } from "../components/UI/Buttons";
import { initSession } from "../utils/authHelpers";

import WhiteLogo, { FBIcon, IGIcon, TwitterIcon, YTIcon } from "/components/UI/Icons";

import axios from "axios";

import classes from "/styles/Index.module.scss";
import { useRouter } from "next/router";

const Index = () => {
	const router = useRouter();
	// const { userSession } = useContext(UserSessionContext);
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status !== "loading") {
			if (session) {
				if (session.isViewingGroup) {
					console.log("viewing a group");
					// router.replace("/browse");
				} else {
					console.log("not viewing a group");
					router.replace("/my-groups");
				}
			} else {
				console.log("not signed in");
				signIn();
			}
		}
	}, [status, session]);

	return null;
};

export default Index;
