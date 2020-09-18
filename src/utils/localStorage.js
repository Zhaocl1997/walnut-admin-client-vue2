
'use strict'

const ls = (function () {
    // set
    function set(key, value) {
        if (typeof value === 'string') {
            localStorage.setItem(key, value)
        } else {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }

    // get
    function get(key) {
        const value = localStorage.getItem(key)
        console.log(value);

        if (value === null) {
            return
        } else if (typeof value === 'string') {
            return value
        } else {
            return JSON.parse(value)
        }
    }

    // remove
    function remove(key) {
        localStorage.removeItem(key)
    }

    // clear
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