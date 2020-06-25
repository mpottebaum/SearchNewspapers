const editionReducer = (state=null, action) => {
    switch(action.type) {
        case 'ADD_EDITION':
            return action.edition
        case 'START_ADD_SEQUENCE':
            return null
        default:
            return state
    }
}

export default editionReducer