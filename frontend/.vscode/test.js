

let startFrom = (name, arr) => {
    // let nameInt = arr.indexOf(name)
    let returnedInt = arr.splice(arr.indexOf(name),)
    arr.forEach((item, index, array) => returnedInt.push(item))
    return returnedInt
}

let arr = ['grace', 'ekere', 'joanne', 'joy', 'abigail']
resort('joy', arr)