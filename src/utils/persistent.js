
import { createStroage } from 'easy-fns-ts/dist/esm/storage'

const prefixKey = 'WALNUT_'

const ls = createStroage({ prefixKey, storage: localStorage })
const ss = createStroage({ prefixKey, storage: sessionStorage })

/* LOCAL */
export const setLocal = (k, v) => {
    ls.set(k, v)
}

export const getLocal = (k) => {
    return ls.get(k)
}

export const clearLocal = () => {
    ls.clear()
}

export const removeLocal = (k) => {
    ls.remove(k)
}

/* SESSION */
export const setSession = (k, v) => {
    ss.set(k, v)
}

export const getSession = (k) => {   
    return ss.get(k)
}

export const clearSession = () => {
    ss.clear()
}

export const removeSession = (k) => {
    ss.remove(k)
}

