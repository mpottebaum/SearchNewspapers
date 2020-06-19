const pagesReducer = (state=[], action) => {
    switch(action.type) {
        case 'ADD_PAGES':
            return action.pages
        case 'ADD_PAGE':
            return [
                ...state,
                action.page
            ]
        case 'DELETE_PAGE':
            return state.filter(page => page.id !== action.id)
        default:
            return state
    }
}

export default pagesReducer