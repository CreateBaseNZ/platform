import { applyMiddleware, createStore, Middleware, Store } from "redux";
import { createWrapper, Context } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import reducer, { TState } from "./reducers/reducer";

const bindMiddleware = (middleware: Middleware[]) => {
	if (process.env.NODE_ENV !== "production") {
		const { composeWithDevTools } = require("redux-devtools-extension");
		return composeWithDevTools(applyMiddleware(...middleware));
	}
	return applyMiddleware(...middleware);
};

// create a makeStore function
const makeStore = (context: Context) => createStore(reducer, bindMiddleware([thunkMiddleware]));

// export an assembled wrapper
export const wrapper = createWrapper<Store<TState>>(makeStore, { debug: true });
