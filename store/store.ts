import { createStore, Store } from "redux";
import { createWrapper, Context } from "next-redux-wrapper";
import reducer, { TState } from "./reducers/reducer";

// create a makeStore function
const makeStore = (context: Context) => createStore(reducer);

// export an assembled wrapper
export const wrapper = createWrapper<Store<TState>>(makeStore, { debug: true });
