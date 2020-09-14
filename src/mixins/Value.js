
'use strict'

export default {
    computed: {
        selfValue: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            }
        },
    }
}

