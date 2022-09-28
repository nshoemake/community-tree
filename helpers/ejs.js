const dayjs = require('dayjs')
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

module.exports = {
    formatDate: function (date, format) {
        return dayjs(date).format(format)
    },
}