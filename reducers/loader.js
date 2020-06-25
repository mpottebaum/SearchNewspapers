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
        case 'START_GET_RESULTS':
            return true
        case 'ADD_RESULTS':
            return false
        case 'START_ADD_SEQUENCE':
            return true
        case 'ADD_SEQUENCE':
            return false
        case 'START_ADD_EDITION_PAGE':
            return true
        case 'ADD_EDITION_PAGE':
            return false
        default:
            return state
    }
}

export default loaderReducer