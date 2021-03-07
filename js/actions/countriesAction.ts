import { Country } from '../types';
import { Dispatch } from 'redux';

export type CountriesAction = GetCountriesAction;

export const GET_COUNTRIES = 'GET_COUNTRIES';

interface GetCountriesAction {
    type: typeof GET_COUNTRIES;
    countries: Country[];
}


export async function fetchCountries(): Promise<Country[]> {
    const mapper = async (res: Response): Promise<Country[]> => {
        const json = await res.json();
        const countries: Country[] = json; //Mapping from json to typescript. Since the typescript type is equal to the json, it should map 1:1
        return countries;
    }
    return fetchAuthorizedGenericGetWithErrorHandling('https://restcountries.eu/rest/v2/all', mapper); //calling the url to get the data
}

function getCountriesFunction(countries: Country[]) {
    return {
        type: GET_COUNTRIES,
        countries,
    };
}

export const getCountries = () => async (dispatch: Dispatch) => {
    const countries = await fetchCountries();
    dispatch(getCountriesFunction(countries));
};

export type GenericResponseMapperFn<T> = (response: Response) => Promise<T>;

//standard get method
export async function fetchAuthorizedGenericGetWithErrorHandling<T>(url: string, mapper: GenericResponseMapperFn<T>): Promise<T> {
    const overrideOptions: OverrideOptionObject = {
        method: 'GET',
    };
    const response = await fetch(url, overrideOptions);
    return mapper(response);
}

//helper method to expand upon a simple get method
export type OverrideOptionObject = {
    headers?: {
        Accept: string;
        'Content-Type': string;
    };
    method?: 'GET';
    body?: string; // stringified json for example
};
