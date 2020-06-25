import { DOMAIN } from '../constants/index'

export const addTitle = lccn => {
    const id = /\/lccn\/s?n?[0-9]+/.exec(lccn)[0]
    const url = DOMAIN + `${id}.json`
    return dispatch => {
        dispatch({type: 'START_ADD_TITLE'})
        fetch(url)
        .then(resp => resp.json())
        .then(title => {
            dispatch({type: 'ADD_TITLE', title: title})
            console.log(title.issues[0])
        })
    }
}