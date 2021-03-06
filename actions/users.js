import { API_DOMAIN, HEADERS } from '../constants/index'
import { asyncStore, removeAsyncData } from '../helpers/index'

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
            dispatch({type: 'ADD_USER', user: {id: user.id}})
            dispatch({type: 'ADD_PAGES', pages: user.pages})
            asyncStore('userId', `${user.id}`)
        })
    }
}

export const addUser = id => {
    return dispatch => {
        dispatch({type: 'ADD_USER', user: {id: id}})
    }

}

export const deleteUser = id => {
    const configObj = {
        method: 'DELETE',
        headers: HEADERS
    }
    const url = `${API_DOMAIN}/users/${id}`
    return dispatch => {
        removeAsyncData('userId')
        dispatch({type: 'DELETE_USER'})
        fetch(url, configObj)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }
}


export const getPages = userId => {
    const url = `${API_DOMAIN}/users/${userId}/pages`
    return dispatch => {
        dispatch({type: 'START_ADD_PAGES'})
        fetch(url)
        .then(resp => resp.json())
        .then(pages => {
            dispatch({type: 'ADD_PAGES', pages: pages})
        })
    }
}


export const savePage = (result, seq, userId) => {
    const execId = /\/lccn\/s?n?[0-9]+\/[0-9]+-[0-9]+-[0-9]+\/ed-[0-9]+\/seq-[0-9]+/.exec(seq.pdf)
    const lccn = `${execId[0]}/`
    const {
        date,
        title_normal,
        start_year,
        end_year,
        city,
        state,
        language,
        frequency,
        publisher,
        note
    } = result
    const { pdf, sequence, title } = seq
    const body = {
        pdf,
        sequence,
        date,
        title_normal,
        start_year,
        end_year,
        frequency,
        publisher,
        city: city[0],
        state: state[0],
        languages_attributes: language.map(lang => { return {name: lang}}),
        note: buildNote(note),
        lccn: lccn,
        name: title.name.toUpperCase()
    }
    const configObj = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(body)
    }
    const url = `${API_DOMAIN}/users/${userId}/pages`
    return dispatch => {
        fetch(url, configObj)
        .then(resp => resp.json())
        .then(page => {
            dispatch({type: 'ADD_PAGE', page: page})
        })
    }
}

const buildNote = note => {
    return typeof note === 'object' ? Object.values(note).join('\n') : note
}

// create_table "pages", force: :cascade do |t|
// t.string "pdf"
// t.string "date"
// t.string "title_normal"
// t.string "start_year"
// t.string "end_year"
// t.string "city"
// t.string "state"
// t.string "frequency"
// t.string "publisher"
// t.string "note"
// t.string "lccn"


export const selectPageDel = id => {
    return dispatch => {
        dispatch({type: 'SELECT_PAGE', id: id})
    }
}

export const deselectPageDel = id => {
    return dispatch => {
        dispatch({type: 'DESELECT_PAGE', id: id})
    }
}

export const deletePages = (userId, pageIds) => {
    const body = {
        page_ids: pageIds
    }
    const configObj = {
        method: 'DELETE',
        headers: HEADERS,
        body: JSON.stringify(body)
    }
    const url = `${API_DOMAIN}/users/${userId}/pages`
    return dispatch => {
        dispatch({type: 'CLEAR_SELECTED_PAGES_DEL'})
        pageIds.forEach(id => dispatch({type: 'DELETE_PAGE', id: id}))
        fetch(url, configObj)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }
}

export const renamePage = (userId, pageId, name) => {
    const body = {
        name: name
    }
    const configObj = {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify(body)
    }
    const url = `${API_DOMAIN}/users/${userId}/pages/${pageId}`
    return dispatch => {
        dispatch({type: 'RENAME_PAGE', id: pageId, name: name})
        fetch(url, configObj)
        .then(resp => resp.json())
        .then(page => {})
    }
}