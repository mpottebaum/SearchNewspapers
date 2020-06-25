import AsyncStorage from '@react-native-community/async-storage'

export const asyncStore = (key, value) => {
    AsyncStorage.setItem(key, value)
    .then(x => AsyncStorage.getItem(key))
    .then((val) => { 
        console.log(val)
    })
}

export const getAsyncData = (key, action) => {
    AsyncStorage.getItem(key)
    .then(val => {
      if (val !== null) {
          console.log(val)
          action(val)
      }
    })
    .catch(err => console.error('error: ', err))
}

export const removeAsyncData = key => {
    AsyncStorage.removeItem(key)
  }

export const convertDate = date => {
    const sanDate = date.replace(/-/g, '')
    const year = sanDate.slice(0, 4)
    const month = sanDate.slice(4, 6)
    const day = sanDate.slice(6, 8)
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