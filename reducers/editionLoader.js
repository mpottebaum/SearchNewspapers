const editionLoaderReducer = (state=false, action) => {
    switch(action.type) {
        case 'START_ADD_EDITION':
            return true
        case 'ADD_EDITION':
            return false
        default:
            return state
    }
}

export default editionLoaderReducer