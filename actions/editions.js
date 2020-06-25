import { DOMAIN } from '../constants/index'

export const addEdition = (result, sequence) => {
    const splitId = result.id.split('/seq')
    const id = splitId[0]
    const url = `${DOMAIN + id}.json`
    return addEdDispatch(url, sequence)
}

export const addEdFromPage = page => {
    const splitId = page.lccn.split('/seq')
    const id = splitId[0]
    const url = `${DOMAIN + id}.json`
    return addEdDispatch(url, page)
}

export const addEdFromTitle = url => {
    return addEdDispatch(url, null)
}

const addEdDispatch = (url, page) => {
    return dispatch => {
        dispatch({type: 'START_ADD_EDITION', page: page})
        if(!page) dispatch({type: 'START_ADD_EDITION_PAGE'})
        fetch(url)
        .then(resp => resp.json())
        .then(edition => {
            dispatch({type: 'ADD_EDITION', edition: edition})
            if(!page) {
                const firstPage = edition.pages.find(page => page.sequence === 1)
                fetch(firstPage.url)
                .then(resp => resp.json())
                .then(pageResp => {
                    dispatch({type: 'ADD_EDITION_PAGE', page: pageResp})
                })
            }
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