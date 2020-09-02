
'use strict'

const ls = (function () {
    // 设置localStorage
    function set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    // 获取localStorage
    function get(key) {
        if (JSON.parse(localStorage.getItem(key)) === null) {
            return false
        } else {
            return JSON.parse(localStorage.getItem(key))
        }
    }

    // 移除localStorage
    function remove(key) {
        localStorage.removeItem(key)
    }

    // 清空localStorage
    function clear() {
        localStorage.clear()
    }

    // 判断localStorage是否为空
    function isLocalEmpty(key) {
        const hasItem = get(key)

        if (hasItem === null) {
            return true
        } else {
            return false
        }
    }

    return {
        set,
        get,
        remove,
        clear,
        isLocalEmpty
    }
})()

export default ls