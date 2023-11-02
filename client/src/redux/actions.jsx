import { GET_ACTIVITIES, DELETE_ACTIVITIES, GET_COUNTRIES, GET_COUNTRY_DETAIL, CREATE_ACTIVITY,SEARCH_COUNTRY,FILTER_COUNTRY, ORDER_BY_NAME,} from "./action-types";
import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://localhost:3001/'
    baseURL: 'https://pi-countries-production-b421.up.railway.app'
  });

export const getCountries = () => {
    return async (dispatch) => {
        const {data} = await instance.get('countries');
        return dispatch({ type: GET_COUNTRIES, payload: data });
    }
};

export const getCountryDetail = (id) => {
    return async (dispatch) => {
        let info = await instance.get(`countries/${id}`);
        return dispatch({ type: GET_COUNTRY_DETAIL, payload: info.data });
    }
}

export const createActivity = (payload) => {
    return async (dispatch) => {
        let info = await instance.post('activities',payload);
        return dispatch({ type: CREATE_ACTIVITY, payload: info.data });
    }
}

export const getActivities = (payload) => {
    return async (dispatch) => {
        let info = await instance.get('activities', payload);
        return dispatch({ type: GET_ACTIVITIES, payload: info.data });
    }
}

export const deleteActivities = (payload) => {
    return async (dispatch) => {
        try {
            let info = await instance.delete(`activities?name=${payload}`);
            return dispatch({ type: DELETE_ACTIVITIES, payload: info.data })
        } catch (error) {
            console.log('Error deleting activity', error);
        }
    }
}

export const searchCountry = (payload) => {
    return async (dispatch) => {
        try {
            let info = await instance.get(`countries/?name=${payload}`);
            return dispatch({ type: SEARCH_COUNTRY, payload: info.data });
        } catch (error) {
            console.log('Error when searching for a country', error);
        }
    }
}

export const countryFilter = (payload)=>{
    return { type: FILTER_COUNTRY, payload }
}

export const ordeByName = (payload) => {
    return { type:ORDER_BY_NAME, payload }
}
