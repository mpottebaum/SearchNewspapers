const loaderReducer = (state=false, action) => {
    switch(action.type) {
        case 'START_ADD_USER':
            return true
        case 'ADD_USER':
            return false
        default:
            return state
    }
}

export default loaderReducer