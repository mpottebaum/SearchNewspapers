import { DOMAIN } from '../constants/index'

export const addSequence = result => {
    const id = result.id.slice(0, -1)
    const url = `${DOMAIN + id}.json`
    return dispatch => {
        dispatch({type: 'START_ADD_SEQUENCE', result: result})
        fetch(url)
        .then(resp => resp.json())
        .then(sequence => {
            dispatch({type: 'ADD_SEQUENCE', sequence: sequence})
        })
    }
}

export const addSeqFromPage = page => {
    return dispatch => {
        dispatch({type: 'ADD_RESULT', result: page})
        dispatch({type: 'ADD_SEQUENCE', sequence: {pdf: page.pdf}})
    }
}