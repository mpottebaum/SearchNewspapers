import { SEARCH_URL } from '../constants/index'

export const getResults = query => {
    const url = `${SEARCH_URL + query}&format=json`
    return dispatch => {
        dispatch({type: 'START_GET_RESULTS'})
        fetch(url)
        .then(resp => resp.json())
        .then(results => {
            dispatch({type: 'ADD_RESULTS', results: results.items})
        })
    }
}