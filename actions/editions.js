import { DOMAIN } from '../constants/index'

export const addEdition = (result, sequence) => {
    const splitId = result.id.split('/seq')
    const id = splitId[0]
    const url = `${DOMAIN + id}.json`
    return dispatch => {
        dispatch({type: 'START_ADD_EDITION', page: sequence})
        fetch(url)
        .then(resp => resp.json())
        .then(edition => {
            dispatch({type: 'ADD_EDITION', edition: edition})
        })
    }
}

export const addEdFromPage = page => {
    const splitId = page.lccn.split('/seq')
    const id = splitId[0]
    const url = `${DOMAIN + id}.json`
    return dispatch => {
        dispatch({type: 'START_ADD_EDITION', page: page})
        fetch(url)
        .then(resp => resp.json())
        .then(edition => {
            dispatch({type: 'ADD_EDITION', edition: edition})
        })
    }
}

export const addEditionPage = (sequence, edition) => {
    const page = edition.pages.find(page => page.sequence === parseInt(sequence))
    const url = page.url
    return dispatch => {
        dispatch({type: 'START_ADD_EDITION_PAGE'})
        fetch(url)
        .then(resp => resp.json())
        .then(page => {
            dispatch({type: 'ADD_EDITION_PAGE', page: page})
        })
    }
}