
'use strict'

export default function (width = '100%') {
    return {
        computed: {
            style() {
                return this.block ? "width:100%" : `width:${this.width}`
            }
        },

        props: {
            block: Boolean,
            width: { type: String, default: width }
        }
    }
}

