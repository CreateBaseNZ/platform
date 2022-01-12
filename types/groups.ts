export type Role = "admin" | "teacher" | "student";

export interface GroupAndUserObject {
	alias: string;
	id: string;
	licenseId: string;
	name: string;
	numOfUsers: { admins: number; students: number; teachers: number };
	role: Role;
	status: "activated" | "requested" | "invited" | "deactivated";
	type: "school";
	verified: boolean;
}
