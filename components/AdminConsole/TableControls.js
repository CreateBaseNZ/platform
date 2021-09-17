import classes from "./TableControls.module.scss";

const TableControls = ({ isChecked, tab, setTab, tabs, allUsers, collapseHeader, setCollapseHeader, search, searchHandler, removeUserHandler, showRemoveConfirm, setShowRemoveConfirm }) => {
	return (
		<div className={classes.controls}>
			{!showRemoveConfirm && (
				<div className={classes.mainBtnContainer}>
					{!isChecked[tab] && (
						<>
							{tabs.map((t) => (
								<button key={t.label} className={`${classes.tab} ${tab === t.label ? classes.active : ""}`} onClick={() => setTab(t.label)}>
									<i className="material-icons-outlined">{t.icon}</i> {t.label}
									<div className={classes.title}>View {t.label}</div>
								</button>
							))}
						</>
					)}
					{isChecked[tab] > 0 && (
						<>
							<div className={classes.nSelected}>{isChecked[tab]} selected</div>
							<div className={classes.actions}>
								{tab === "educators" && (
									<button>
										<i className="material-icons-outlined">add_moderator</i>
										<div className={classes.title}>Promote to Admin</div>
									</button>
								)}
								{tab === "admins" && (
									<button>
										<i className="material-icons-outlined">remove_moderator</i>
										<div className={classes.title}>Demote Admin</div>
									</button>
								)}
								{/* <button onClick={() => setShowRemoveConfirm(true)}>
									<i className="material-icons-outlined">person_remove</i>
									<div className={classes.title}>Remove from org</div>
								</button> */}
							</div>
						</>
					)}
				</div>
			)}
			{!showRemoveConfirm && (
				<div className={classes.otherBtnContainer}>
					<div className={classes.search}>
						<input placeholder="Search" value={search} onChange={searchHandler} />
						<i className="material-icons-outlined">search</i>
						<div className={classes.title}>Search by date using the YYYY-MM-DD format</div>
					</div>
					<button className={classes.toggleHeader} onClick={() => setCollapseHeader((state) => !state)} title="Expand table view">
						<span>{collapseHeader ? "Collapse" : "Expand"}</span>
						<i className="material-icons-outlined" style={{ transform: collapseHeader && "rotate(180deg)" }}>
							expand_less
						</i>
					</button>
				</div>
			)}
			{showRemoveConfirm && (
				<div className={classes.confirm}>
					Are you sure you want to remove {isChecked[tab]} {isChecked[tab] === 1 ? tab.slice(0, -1) : tab} from your organisation?
					<button className={classes.cancelBtn} onClick={() => setShowRemoveConfirm(false)}>
						Cancel
					</button>
					<button className={classes.confirmBtn} onClick={removeUserHandler}>
						Yes, remove
					</button>
				</div>
			)}
		</div>
	);
};

export default TableControls;
