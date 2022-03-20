import { HYDRATE } from "next-redux-wrapper";
import { AnyAction, combineReducers, Reducer } from "redux";
import { ThunkAction } from "redux-thunk";
import accountReducer, { TAccountState } from "./accountReducer";
import codeStepReducer, { DEFAULT_CODE_STEP_STATE, TCodeStepState } from "./codeStepReducer";

export type TState = {
	account: TAccountState;
	codeStep: TCodeStepState;
};

export const combinedReducer = combineReducers({
	account: accountReducer,
	codeStep: codeStepReducer,
});

const DEFAULT_STATE: TState = {
	account: 0,
	codeStep: DEFAULT_CODE_STEP_STATE,
};

const reducer = (state: TState = DEFAULT_STATE, action: AnyAction) => {
	if (action.type === HYDRATE) {
		// Attention! This will overwrite client state! Real apps should use proper reconciliation.
		return { ...state, ...action.payload };
		// // code below is example code from next
		// const nextState = {
		// 	...state, // use previous state
		// 	...action.payload, // apply delta from hydration
		// };
		// if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
		// return nextState;
	} else {
		return combinedReducer(state, action);
	}
};

export default reducer;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TState, unknown, AnyAction>;
