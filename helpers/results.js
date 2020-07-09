export const firstVisiblePage = (page, numPages) => {
    if(numPages <= 50) {
        return 1
    } else if(page + 25 > numPages) {
        return numPages - 50
    } else if(page - 25 < 1) {
        return 1
    } else {
        return page - 25
    }
}