const queryReducer = (state='', action) => {
    switch(action.type) {
        case 'START_GET_RESULTS':
            return action.query
        default:
            return state
    }
}

export default queryReducer