import classes from "./PageNav.module.scss";

const PageNav = ({ pageIndex, gotoPage, previousPage, canPreviousPage, nextPage, canNextPage, length }) => {
	return (
		<div className={classes.pageNav}>
			<i className={`material-icons-outlined ${!canPreviousPage ? classes.disabled : ""}`} onClick={() => gotoPage(0)} title="First page">
				first_page
			</i>
			<i className={`material-icons-outlined ${!canPreviousPage ? classes.disabled : ""}`} onClick={() => previousPage()} title="Previous page">
				navigate_before
			</i>
			<i className={`material-icons-outlined ${!canNextPage ? classes.disabled : ""}`} onClick={() => nextPage()} title="Next page">
				navigate_next
			</i>
			<i className={`material-icons-outlined ${!canNextPage ? classes.disabled : ""}`} onClick={() => gotoPage(pageCount - 1)} title="Last page">
				last_page
			</i>
			<div className={classes.results}>
				Page {pageIndex + 1} of {length || 1}
			</div>
		</div>
	);
};

export default PageNav;
