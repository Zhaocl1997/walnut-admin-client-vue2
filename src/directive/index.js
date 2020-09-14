
'use strict'

import dialogDrag from './dialogDrag'
import loadmore from './loadmore'

const install = function (Vue) {
    Vue.directive('dialogDrag', dialogDrag)
    Vue.directive('loadmore', loadmore)
}

if (window.Vue) {
    window['dialogDrag'] = dialogDrag
    window['loadmore'] = loadmore
    Vue.use(install) // eslint-disable-line
}

export default install
