module.exports = {
    strIncludes: function(str, includes) {
        for (let include in includes) {
            if (str.includes(include)) return true;
        }
        return false;
    }
};
