
'use strict'

export function format(time, format = 'YYYY-MM-DD HH:mm:ss') {
    const t = new Date(time) // 2019-11-09T06:27:57.040Z
    const tf = (i) => { return (i < 10 ? '0' : '') + i }

    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (key) => {
        switch (key) {
            case 'YYYY':
                return tf(t.getFullYear())
            case 'MM':
                return tf(t.getMonth() + 1)
            case 'DD':
                return tf(t.getDate())
            case 'HH':
                return tf(t.getHours())
            case 'mm':
                return tf(t.getMinutes())
            case 'ss':
                return tf(t.getSeconds())
        }
    })
}

// 获取当前时间
export function getNow() {
    return format(new Date(), 'YYYY-MM-DD HH:mm:ss')
}