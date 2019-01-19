export default (data, num) => {
    let result = [];
    for (var i = 0, len = data.length; i < len; i += num) {
        result.push(data.slice(i, i + num))
    }
    return result;
}