// const getNum = (value) => {
//     return value * 2
// }

// module.exports = getNum

const getNum = (value) => {
    if (value === 0) {
        return 1
    } else {
        return value * 2
    }
}

module.exports = getNum