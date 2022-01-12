import styles from "../styles/_exports.module.scss";
import { ProjectDifficulty } from "../types/projects";

type DifficultyColors = Record<ProjectDifficulty, string>;

const PROJECT_DIFFICULTIES: DifficultyColors = {
	introductory: styles.greenMid,
	proficient: styles.amber,
	advanced: styles.red,
};

export default PROJECT_DIFFICULTIES;
