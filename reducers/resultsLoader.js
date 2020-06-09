const resultsLoaderReducer = (state=false, action) => {
    switch(action.type) {
        case 'START_GET_RESULTS':
            return true
        case 'ADD_RESULTS':
            return false
        default:
            return state
    }
}

export default resultsLoaderReducer