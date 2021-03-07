import { combineReducers } from 'redux';
import countriesReducer from './countries';


const reducers = {
    countriesReducer
};

export type ReduxState = {
    [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>;
};

const AppReducer = combineReducers(reducers);

export default AppReducer;
