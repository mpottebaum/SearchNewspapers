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
        case 'RENAME_PAGE':
            return state.map(page => {
                if(page.id === action.id) {
                    return {
                        ...page,
                        name: action.name
                    }
                } else return page
            })
        default:
            return state
    }
}

export default pagesReducer