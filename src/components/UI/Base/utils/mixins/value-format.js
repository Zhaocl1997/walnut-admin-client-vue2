
'use strict'

import { isEmpty } from "easy-fns/lib/utils";
import { isString } from "easy-fns/lib/type";

export default function (defaultMultipleValue = [], defaultSingleValue = "") {
    return {
        data() {
            return {
                customValue: []
            };
        },

        props: {
            multiple: Boolean,

            valueFormat: String,
            valueType: { type: String, default: "string" },

            options: { type: Array, default: () => [] },
            optionValue: { type: String, default: "value" },
            optionLabel: { type: String, default: "label" },
        },

        methods: {
            onInitCustomValue() {
                if (isEmpty(this.value)) {
                    if (this.multiple) {
                        this.customValue = defaultMultipleValue;
                    } else {
                        this.customValue = defaultSingleValue;
                    }
                } else {
                    if (this.isForamattable) {
                        if (isString(this.value)) {
                            this.customValue = this.onValueType(
                                this.value.split(this.valueFormat)
                            );
                        }
                    } else {
                        this.customValue = this.value;
                    }
                }
            },

            onValueChange(value) {
                if (this.isForamattable) {
                    this.$emit("input", value.join(this.valueFormat));
                } else {
                    this.$emit("input", value);
                }
            },

            onValueType(value) {
                if (this.multiple) {
                    if (this.valueType === "number") {
                        return value.map(Number);
                    }

                    if (this.valueType === "string") {
                        return value.map(String);
                    }
                } else {
                    if (this.valueType === "number") {
                        return Number(value);
                    }

                    if (this.valueType === "string") {
                        return String(value);
                    }
                }
            }
        }
    }
}


