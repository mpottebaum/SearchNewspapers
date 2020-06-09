const selectedResultReducer = (state={}, action) => {
    switch(action.type) {
        case 'START_ADD_SEQUENCE':
            return action.result
        default:
            return state
    }
}

export default selectedResultReducer