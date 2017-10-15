module.exports = {
    strIncludes: function(str, includes) {
        for (var include in includes) {
            if (str.includes(include)) return true;
        }
        return false;
    }
};
