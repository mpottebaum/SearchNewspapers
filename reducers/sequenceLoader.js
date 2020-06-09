const sequenceLoaderReducer = (state=false, action) => {
    switch(action.type) {
        case 'START_ADD_SEQUENCE':
            return true
        case 'ADD_SEQUENCE':
            return false
        default:
            return state
    }
}

export default sequenceLoaderReducer