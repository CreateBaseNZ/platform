import { useEffect, useState } from "react";
import classes from "./AdminConsole.module.scss";

const columns = {
	learners: ["disp Name", "username", "joined", "invited By"],
	educators: ["disp Name", "username", "email", "joined", "invited By"],
	admins: ["disp Name", "username", "email", "joined", "invited By"],
};

const learnersData = [
	{ dispName: "Dainty Mink", username: "jamie-lee_monroe", joined: "21 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Ridiculous Sailfish", username: "karolina-hancock", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Joyful Komodo Dragon", username: "Aaryan_Braun", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Dainty Aphid", username: "jane_mary_doe", joined: "19 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Nice Clownfish", username: "Maizieryan", joined: "18 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Yummy Trout", username: "Benny_bautista", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Generous Tarantula", username: "Linzi-Griffin", joined: "17 Aug 2021", invitedBy: "jane_mary_doe" },
];
const educatorsData = [
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
	{ dispName: "Mrs. Doe", username: "jane_mary_doe", email: "jm.doe@park.school.nz", joined: "24 Aug 2021", invitedBy: "park_admin_0" },
];
const adminsData = [
	{ dispName: "Mrs Doe", username: "jane_mary_doe", email: "jm.doe@hayes.school.nz", joined: "24 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Mrs Sivan", username: "valerius-sivan", email: "jm.doe@hayes.school.nz", joined: "24 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Mr Phoebe", username: "jane_mary_doe", email: "jm.doe@hayes.school.nz", joined: "24 Aug 2021", invitedBy: "jane_mary_doe" },
	{ dispName: "Ms Radmir", username: "maret_radmir", email: "jm.doe@hayes.school.nz", joined: "24 Aug 2021", invitedBy: "valerius-sivan" },
];

const sizes = [10, 20, 50, 100, "All"];

const AdminConsole = ({ user, setUser, collapseHeader, setCollapseHeader }) => {
	const [tab, setTab] = useState("learners");
	const [allUsers, setAllUsers] = useState({
		learners: learnersData.map((d) => ({ ...d, checked: false })),
		educators: educatorsData.map((d) => ({ ...d, checked: false })),
		admins: adminsData.map((d) => ({ ...d, checked: false })),
	});
	const [isChecked, setIsChecked] = useState({ learners: false, educators: false, admins: false });
	const [size, setSize] = useState(20);

	useEffect(() => {
		setIsChecked((state) => ({ ...state, [tab]: allUsers[tab].some((d) => d.checked) }));
	}, [tab, allUsers]);

	const checkHandler = (row) => {
		setAllUsers((state) => ({
			...state,
			[tab]: state[tab].map((values, i) => {
				if (i === row) {
					return { ...values, checked: !values.checked };
				} else {
					return values;
				}
			}),
		}));
	};

	const setSizeHandler = (selected) => {
		setSize(selected);
	};

	return (
		<div className={classes.adminConsole}>
			<h1>Coming Soon</h1>
		</div>
	);
};

export default AdminConsole;
