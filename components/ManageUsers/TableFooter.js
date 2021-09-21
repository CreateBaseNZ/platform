import classes from "./ManageUsers.module.scss";

const renderPages = (nPages, page, setPage) => {
	if (nPages <= 7) {
		return (
			<>
				{[...Array(nPages).keys()].map((p) => (
					<button key={p} className={`${classes.pageBtn} ${p === page ? classes.activePage : ""}`} onClick={() => setPage(p)}>
						{p + 1}
					</button>
				))}
			</>
		);
	} else {
		if (page <= 3) {
			return (
				<>
					{[...Array(5).keys()].map((p) => (
						<button key={p} className={`${classes.pageBtn} ${p === page ? classes.activePage : ""}`} onClick={() => setPage(p)}>
							{p + 1}
						</button>
					))}
					<button className={classes.pageBtn} style={{ pointerEvents: "none" }}>
						...
					</button>
					<button className={classes.pageBtn} onClick={() => setPage(nPages - 1)}>
						{nPages}
					</button>
				</>
			);
		} else if (nPages - page <= 4) {
			return (
				<>
					<button className={classes.pageBtn} onClick={() => setPage(0)}>
						1
					</button>
					<button className={classes.pageBtn}>...</button>
					{[...Array(5).keys()].reverse().map((p) => (
						<button key={p} className={`${classes.pageBtn} ${nPages - p - 1 === page ? classes.activePage : ""}`} onClick={() => setPage(nPages - p - 1)}>
							{nPages - p}
						</button>
					))}
				</>
			);
		} else {
			return (
				<>
					<button className={classes.pageBtn} onClick={() => setPage(0)}>
						1
					</button>
					<button className={classes.pageBtn} style={{ pointerEvents: "none" }}>
						...
					</button>
					{[-1, 0, 1].map((p) => (
						<button key={p} className={`${classes.pageBtn} ${p === 0 ? classes.activePage : ""}`} onClick={() => setPage(page + p)}>
							{page + p + 1}
						</button>
					))}
					<button className={classes.pageBtn} style={{ pointerEvents: "none" }}>
						...
					</button>
					<button className={classes.pageBtn} onClick={() => setPage(nPages - 1)}>
						{nPages}
					</button>
				</>
			);
		}
	}
};

const renderPagination = (page, setPage, size, allUsers, tab) => {
	const nPages = Math.ceil(allUsers[tab].length / size);

	return (
		<>
			<i className={`material-icons-outlined ${classes.pageBtn} ${page === 0 || nPages <= 7 ? classes.disabled : ""}`} onClick={() => setPage((state) => state - 1)}>
				navigate_before
			</i>
			<div className={classes.pages}>{renderPages(nPages, page, setPage)}</div>
			<i className={`material-icons-outlined ${classes.pageBtn} ${page + 1 === nPages || nPages <= 7 ? classes.disabled : ""}`} onClick={() => setPage((state) => state + 1)}>
				navigate_next
			</i>
		</>
	);
};

const TableFooter = ({ showSizeMenu, setShowSizeMenu, allSize, size, sizes, setSizeHandler, page, setPage, allUsers, tab }) => {
	return (
		<div className={classes.tableFooter}>
			<div className={classes.viewSize}>
				View
				<button className={`${classes.viewSizeBtn} ${showSizeMenu ? classes.show : ""}`} onClick={() => setShowSizeMenu((state) => !state)} onBlur={() => setShowSizeMenu(false)}>
					<span>{size === allSize ? "All" : size}</span> <i className="material-icons-outlined">expand_less</i>
					<div className={classes.viewSizeMenu}>
						{sizes.map((o) => (
							<div key={o} onClick={() => setSizeHandler(o)}>
								{o}
							</div>
						))}
					</div>
				</button>
				per page
			</div>
			<div className={classes.pagination}>{renderPagination(page, setPage, size, allUsers, tab)}</div>
			<div className={classes.results}>
				{page * size + 1} - {Math.min(page * size + size + 1, allUsers[tab].length)} of {allUsers[tab].length} {tab}
			</div>
		</div>
	);
};

export default TableFooter;
