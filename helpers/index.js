export const convertDate = date => {
    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = date.slice(6, 8)
    return `${month}/${day}/${year}`
}

export const titleize = title => {
    const removePeriod = title.slice(0, -1)
    const splitTitleSpace = removePeriod.split(' ')
    const capitalizedSpace = capitalizeWords(splitTitleSpace)
    const spaceCapTitle = capitalizedSpace.join(' ')
    const splitTitleDash = spaceCapTitle.split('-')
    if(splitTitleDash.length > 1) {
        const capitalizedDash = capitalizeWords(splitTitleDash)
        return capitalizedDash.join('-')
    } else {
        return spaceCapTitle
    }
}

const capitalizeWords = wordArray => {
    return wordArray.map(word => {
        const splitWord = word.split('')
        splitWord[0] = splitWord[0].toUpperCase()
        return splitWord.join('')
    })
}