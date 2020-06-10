const pageReducer = (state=null, action) => {
    switch(action.type) {
        case 'ADD_RESULTS':
            return action.page
        default:
            return state
    }
}

export default pageReducer