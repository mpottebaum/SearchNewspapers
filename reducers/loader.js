const loaderReducer = (state=false, action) => {
    switch(action.type) {
        case 'START_ADD_USER':
            return true
        case 'ADD_USER':
            return false
        case 'START_ADD_PAGES':
            return true
        case 'ADD_PAGES':
            return false
        default:
            return state
    }
}

export default loaderReducer