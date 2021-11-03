import router from "next/router";

const MyAccount = () => {
	router.replace("/my-account/profile");
	return null;
};

MyAccount.auth = "user";

export default MyAccount;
