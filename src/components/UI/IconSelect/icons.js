
'use strict'

const req = require.context('../../../assets/icons/svg', true, /\.svg$/)
const requireAll = requireContext => requireContext.keys()

const regex = /\.\/(.*)\.svg/

const icons = {
    mixeds: []
}

requireAll(req).map(i => {
    const normal = i.match(regex)[1]

    if (normal.includes('/')) {
        if (!icons[normal.split("/")[0]]) {
            icons[normal.split("/")[0]] = []
            icons[normal.split("/")[0]].push(normal.split("/")[1])
        } else {
            icons[normal.split("/")[0]].push(normal.split("/")[1])
        }
    } else {
        icons.mixeds.push(normal)
    }
})

export { icons }
