import { AnyAction } from "redux";

export type TAccountState = number;

const accountReducer = (state: TAccountState = 0, action: AnyAction): TAccountState => {
	switch (action.type) {
		case "deposit":
			return state + action.payload;
		case "withdraw":
			return state - action.payload;
		default:
			return state;
	}
};

export default accountReducer;
