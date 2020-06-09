import { DOMAIN } from '../constants/index'

export const addSequence = id => {
    const url = `${DOMAIN + id}.json`
    return dispatch => {
        fetch(url)
        .then(resp => resp.json())
        .then(sequence => {
            console.log(sequence)
        })
    }
}