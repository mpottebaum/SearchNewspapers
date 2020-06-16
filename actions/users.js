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
            dispatch({type: 'ADD_USER', user: {id: user.id}})
            dispatch({type: 'ADD_PAGES', pages: user.pages})
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
    const {
        id,
        sequence,
        date,
        title_normal,
        start_year,
        end_year,
        city,
        state,
        frequency,
        publisher,
        note
    } = result
    const { pdf } = seq
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
        note: note.join('\n'),
        lccn: id
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