const pagesReducer = (state=[], action) => {
    switch(action.type) {
        case 'ADD_PAGES':
            return action.pages
        default:
            return state
    }
}

export default pagesReducer