
'use strict'

import Mock from 'mockjs'
import { randomId } from 'easy-fns/lib/utils'
import { treeToArr, arrToTree, findNodeById } from 'easy-fns/lib/Tree'
import { FORM_TYPE, EMAIL_OPTIONS, INPUT_TYPE, DATE_TYPE, TIME_TYPE, PHONE_PREFIX } from '../utils/constant'

const Random = Mock.Random

Random.extend({
    password: function () {
        return randomId(10)
    },
    phone: function () {
        const phonePrefixs = PHONE_PREFIX
        return this.pick(phonePrefixs) + Mock.mock(/\d{8}/)
    }
})

const mockData = options => {
    const result = {}

    for (let i = 0; i < options.length; i++) {
        const e = options[i];

        switch (e.wType) {
            case FORM_TYPE.INPUT:

                switch (e.type) {
                    case INPUT_TYPE.NUMBER:
                        if (e.min && e.max && e.step) {
                            result[e.prop] = Random.pick(Random.range(e.min, e.max, e.step))
                        } else if (e.precision) {
                            result[e.prop] = Random.float(e.min, e.max)
                        }
                        break;

                    case INPUT_TYPE.TEXTAREA:
                        result[e.prop] = Random.cword(1, e.maxlength)
                        break;

                    case INPUT_TYPE.PASSWORD:
                        result[e.prop] = Mock.mock('@password')
                        break;

                    case INPUT_TYPE.PHONE:
                        result[e.prop] = Mock.mock('@phone')
                        break;

                    case INPUT_TYPE.EMAIL:
                        result[e.prop] = Random.email(Random.pick(EMAIL_OPTIONS).value.split("@")[1]).substr(2)
                        break;

                    case INPUT_TYPE.ID:
                        result[e.prop] = Random.id()
                        break;

                    default:
                        result[e.prop] = Random.word()
                        break;
                }

                break;

            case FORM_TYPE.DATE:

                switch (e.type) {
                    case DATE_TYPE.DATE:
                        result[e.prop] = Random.date()
                        break;

                    case DATE_TYPE.DATETIME:
                        result[e.prop] = Random.datetime()
                        break;

                    default:
                        break;
                }
                break;

            case FORM_TYPE.TIME:

                switch (e.type) {
                    case TIME_TYPE.SELECT:
                        result[e.prop] = Random.time()
                        break;

                    case TIME_TYPE.PICKER:
                        result[e.prop] = Random.time()
                        break;

                    default:
                        break;
                }
                break;

            case FORM_TYPE.SELECT:
                if (e.options) {
                    const temp = []
                    for (const iterator of e.options) {
                        temp.push(iterator[e.optionValue])
                    }

                    result[e.prop] = Random.pick(temp)
                } else {
                    // no options passed in 
                    console.log('no options passed in');
                }
                break;

            case FORM_TYPE.SWITCH:
                result[e.prop] = Random.boolean()
                break;

            case FORM_TYPE.TAG:
                const str = Random.cword(3, 8)
                if (e.valueFormat) {
                    result[e.prop] = str.split("").join(",")
                } else {
                    result[e.prop] = str.split("")
                }
                break;

            case FORM_TYPE.CHECKBOX:
                result[e.prop] = Random.boolean()
                break;

            case FORM_TYPE.TREE:
                // console.log(findNodeById("5de86e8b68de45281460c1f9", e.data, e.nodeKey, e.props));
                // console.log(treeToArr(e.data, e.nodeKey, e.props, true));

                const idArr = treeToArr(e.data, e.nodeKey, e.props, true)

                if (e.multiple) {
                    result[e.prop] = [Random.pick(idArr)]
                } else {
                    result[e.prop] = Random.pick(idArr)
                }
                break;

            default:
                break;
        }
    }

    console.log(result);

    return result
}


export default mockData