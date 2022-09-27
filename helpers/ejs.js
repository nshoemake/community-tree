const dayjs = require('dayjs')

module.exports = {
    formatDate: function (date, format) {
        return dayjs(date).format(format)
    },
}