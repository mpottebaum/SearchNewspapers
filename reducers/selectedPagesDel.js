const selectedPagesDelReducer = (state=[], action) => {
    switch(action.type) {
        case 'SELECT_PAGE':
            return [
                ...state,
                action.id
            ]
        case 'DESELECT_PAGE':
            return state.filter(id => id !== action.id)
        case 'CLEAR_SELECTED_PAGES_DEL':
            return []
        default:
            return state
    }
}

export default selectedPagesDelReducer