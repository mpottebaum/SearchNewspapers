export const createUser = name => {
    return dispatch => {
        dispatch({type: 'ADD_USER', user: {name: name}})
    }
}