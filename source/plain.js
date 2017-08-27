const plain = function (Arrays) {
    return Arrays.reduce(function (result, curr) {
        return result.concat(Array.isArray(curr)? plain(curr) : curr);
    }, [])
};