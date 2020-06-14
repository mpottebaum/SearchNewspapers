import { API_DOMAIN, HEADERS } from '../constants/index'

export const createUser = name => {
    const configObj = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({name: name})
    }
    const url = `${API_DOMAIN}/users`
    return dispatch => {
        dispatch({type: 'START_ADD_USER'})
        fetch(url, configObj)
        .then(resp => resp.json())
        .then(user => {
            dispatch({type: 'ADD_USER', user: user})
        })
    }
}