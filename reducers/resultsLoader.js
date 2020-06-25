const resultsLoaderReducer = (state=false, action) => {
    switch(action.type) {
        case 'START_GET_RESULTS':
            return action.page === 1 ? true : false
        case 'ADD_RESULTS':
            return false
        default:
            return state
    }
}

export default resultsLoaderReducer