import { Country } from '../types';
import { CountriesAction, GET_COUNTRIES } from '../actions/countriesAction';

export interface CountriesState {
    countries: Country[] | undefined;
}

const initialState: CountriesState = {
    countries: undefined,
};

const countriesReducer = (
    state = initialState,
    action: CountriesAction,
): CountriesState => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                countries: action.countries
            }
        default:
            return state;
    }
};

export default countriesReducer;
