const selectedTitleReducer = (state=null, action) => {
    switch(action.type) {
        case 'ADD_TITLE':
            return action.title
        case 'REMOVE_TITLE':
            return null
        default:
            return state
    }
}

export default selectedTitleReducer