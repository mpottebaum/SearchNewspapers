import { SEARCH_URL } from '../constants/index'

export const getResults = (query, page) => {
    const url = `${SEARCH_URL + query}&format=json&page=${page}`
    return dispatch => {
        dispatch({type: 'START_GET_RESULTS', query: query, page: page})
        fetch(url)
        .then(resp => resp.json())
        .then(results => {
            dispatch({type: 'ADD_RESULTS', results: results})
        })
    }
}