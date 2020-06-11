const editionReducer = (state=null, action) => {
    switch(action.type) {
        case 'ADD_EDITION':
            return action.edition
        default:
            return state
    }
}

export default editionReducer