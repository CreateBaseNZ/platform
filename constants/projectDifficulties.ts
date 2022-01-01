import styles from "../styles/_exports.module.scss";

export type ProjectDifficulty = "introductory" | "proficient" | "advanced";

type DifficultyColors = Record<ProjectDifficulty, string>;

const PROJECT_DIFFICULTIES: DifficultyColors = {
	introductory: styles.greenMid,
	proficient: styles.amber,
	advanced: styles.red,
};

export default PROJECT_DIFFICULTIES;
