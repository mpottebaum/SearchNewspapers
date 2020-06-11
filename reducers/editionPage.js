const editionPageReducer = (state=null, action) => {
    switch(action.type) {
        case 'START_ADD_EDITION':
            return action.page
        case 'ADD_EDITION_PAGE':
            return action.page
        default:
            return state
    }
}

export default editionPageReducer