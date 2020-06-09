const sequenceReducer = (state={}, action) => {
    switch(action.type) {
        case 'ADD_SEQUENCE':
            return action.sequence
        default:
            return state
    }
}

export default sequenceReducer