import MainLayout from "../../../../components/Layouts/MainLayout/MainLayout";

import classes from "../../../../styles/supportArticle.module.scss";

const SupportArticle = () => {
	return <div className={classes.article}></div>;
};

SupportArticle.getLayout = (page) => {
	return <MainLayout page="support">{page}</MainLayout>;
};

SupportArticle.auth = "any";

export default SupportArticle;
