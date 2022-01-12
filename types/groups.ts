/** School roles. */
export type SchoolRole = "admin" | "teacher" | "student";

/** Pluralised school roles. */
export type SchoolRolePlural = "admins" | "teachers" | "students";

/** Contains basic information about a user in a group. */
export interface GroupAndUserObject {
	/** Alias only for admins and teachers. */
	alias?: string;
	/** Group ID. */
	id: string;
	/** License ID of the user in the group. */
	licenseId: string;
	/** Group name. */
	name: string;
	/** Number of users of each type. */
	numOfUsers: { [key in SchoolRolePlural]: number };
	/** User role in the group. */
	role: SchoolRole;
	/** License status. */
	status: "activated" | "requested" | "invited" | "deactivated";
	/** Group type. */
	type: "school";
	/** Verification status. */
	verified: boolean;
}
