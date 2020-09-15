
'use strict'

import crypto from "./crypto";

const cookie = (function () {
    const set = (name, val, exdays = 7) => {
        val = crypto.base64.en(val)

        /* set expire time */
        const exdate = new Date()
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)

        /* set cookie */
        window.document.cookie =
            name + "=" + escape(val) + ";path=/;expires=" + exdate.toGMTString()
    }

    const get = (name) => {
        let result = ""
        if (window.document.cookie.length > 0) {
            /* split */
            const arr = window.document.cookie.split("; ")
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].includes(name)) {
                    /* split again */
                    const val = arr[i].split('=')[1]
                    result = crypto.base64.de(val)
                }
            }
        }
        return result
    }

    const getAll = () => {
        let result = {}
        if (window.document.cookie.length > 0) {
            /* split */
            const arr = window.document.cookie.split("; ")
            for (let i = 0; i < arr.length; i++) {
                /* split again */
                const key = arr[i].split('=')[0]
                const val = arr[i].split('=')[1]
                result[key] = val
            }
        }
        return result
    }

    const remove = (name) => {
        this.set(name, "", -1)
    }

    const clear = () => {
        const keys = Object.keys(this.getAll())
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            this.remove(key)
        }
    }

    return {
        set,
        get,
        getAll,
        remove,
        clear
    }
})()

export default cookie