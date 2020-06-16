const pagesReducer = (state=[], action) => {
    switch(action.type) {
        case 'ADD_PAGES':
            return action.pages
        case 'ADD_PAGE':
            return [
                ...state,
                action.page
            ]
        default:
            return state
    }
}

export default pagesReducer