const selectedTitleReducer = (state=null, action) => {
    switch(action.type) {
        case 'ADD_TITLE':
            return action.title
        default:
            return state
    }
}

export default selectedTitleReducer