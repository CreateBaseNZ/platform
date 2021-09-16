import classes from "./AdminConsole.module.scss";

const TableControls = ({ isChecked, tab, setTab, tabs, allUsers, collapseHeader, setCollapseHeader, search, searchHandler }) => {
	return (
		<div className={classes.controls}>
			<div className={classes.mainBtnContainer}>
				{!isChecked[tab] && (
					<>
						{tabs.map((t) => (
							<button key={t.label} className={`${classes.tab} ${tab === t.label ? classes.active : ""}`} onClick={() => setTab(t.label)}>
								<i className="material-icons-outlined">{t.icon}</i> {t.label}
							</button>
						))}
					</>
				)}
				{isChecked[tab] && (
					<>
						<div className={classes.nSelected}>{allUsers[tab].filter((d) => d.checked).length} selected</div>
						<div className={classes.actions}>
							<button>
								<i className="material-icons-outlined">password</i>
								<div className={classes.title}>Reset password</div>
							</button>
							{tab !== "learner" && (
								<button>
									<i className="material-icons-outlined">add_moderator</i>
									<div className={classes.title}>Promote to Admin</div>
								</button>
							)}
							<button>
								<i className="material-icons-outlined">person_remove</i>
								<div className={classes.title}>Remove from org</div>
							</button>
						</div>
					</>
				)}
			</div>
			<div className={classes.otherBtnContainer}>
				<div className={classes.search}>
					<input placeholder="Search" value={search} onChange={searchHandler} />
					<i className="material-icons-outlined">search</i>
				</div>
				<button className={classes.toggleHeader} onClick={() => setCollapseHeader((state) => !state)} title="Expand table view">
					<span>{collapseHeader ? "Collapse" : "Expand"}</span>
					<i className="material-icons-outlined" style={{ transform: collapseHeader && "rotate(180deg)" }}>
						expand_less
					</i>
				</button>
			</div>
		</div>
	);
};

export default TableControls;
