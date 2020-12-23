'use strict'

import Mock from 'mockjs'

import {
  genPassword,
  genEmail,
  genPhone,
  genMAC,
  treeToArr,
  formatTime,
  getRandomElements,
} from 'easy-fns-ts/dist/esm'

import { FORM_TYPE, INPUT_TYPE, DATE_TYPE, TIME_TYPE } from './types'

const Random = Mock.Random

Random.extend({
  password: function () {
    return genPassword(10)
  },
  phone: function () {
    return genPhone()
  },
  email: function () {
    return genEmail()
  },
  mac: function () {
    return genMAC()
  },
})

export const mockData = (options) => {
  const result = {}

  for (let i = 0; i < options.length; i++) {
    const e = options[i]

    switch (e.wType) {
      case FORM_TYPE.INPUT:
        switch (e.type) {
          case INPUT_TYPE.NUMBER:
            if (e.min && e.max && e.step) {
              result[e.prop] = Random.pick(Random.range(e.min, e.max, e.step))
            } else if (e.precision) {
              result[e.prop] = Random.float(e.min, e.max)
            }
            break

          case INPUT_TYPE.TEXTAREA:
            result[e.prop] = Random.cword(1, e.maxlength)
            break

          case INPUT_TYPE.PASSWORD:
            result[e.prop] = Mock.mock('@password')
            break

          case INPUT_TYPE.PHONE:
            result[e.prop] = Mock.mock('@phone')
            break

          case INPUT_TYPE.EMAIL:
            result[e.prop] = Mock.mock('@email')
            break

          case INPUT_TYPE.ID:
            result[e.prop] = Random.id()
            break

          case INPUT_TYPE.IP:
            result[e.prop] = Random.ip()
            break

          case INPUT_TYPE.MACADDRESS:
            result[e.prop] = Mock.mock('@mac')
            break

          case INPUT_TYPE.LETTER:
            result[e.prop] = Random.title()
            break

          case INPUT_TYPE.CHINESE:
            result[e.prop] = Random.ctitle()
            break

          default:
            result[e.prop] = Random.word()
            break
        }

        break

      case FORM_TYPE.DATE:
        switch (e.type) {
          // case DATE_TYPE.DATE:
          //     result[e.prop] = Random.date()
          //     break;

          case DATE_TYPE.DATETIME:
            if (!e.defaultTime) {
              result[e.prop] = Random.datetime()
            } else {
              result[e.prop] =
                formatTime(Random.date(), 'YYYY-MM-DD') + ' ' + e.defaultTime
            }
            break

          case DATE_TYPE.DATETIMERANGE:
            result[e.prop] = [
              Random.datetime(),
              Random.datetime(),
            ].sort((a, b) => a.localeCompare(b, 'zh-CN'))
            break

          case DATE_TYPE.DATES:
            result[e.prop] = [
              formatTime(Random.date(), 'YYYY-MM-DD'),
              formatTime(Random.date(), 'YYYY-MM-DD'),
              formatTime(Random.date(), 'YYYY-MM-DD'),
            ].sort((a, b) => a.localeCompare(b, 'zh-CN'))
            break

          case DATE_TYPE.DATERANGE:
            result[e.prop] = [Random.date(), Random.date()].sort((a, b) =>
              a.localeCompare(b, 'zh-CN')
            )
            break

          case DATE_TYPE.MONTHRANGE:
            result[e.prop] = [
              formatTime(Random.date(), 'YYYY-MM-DD'),
              formatTime(Random.date(), 'YYYY-MM-DD'),
            ].sort((a, b) => a.localeCompare(b, 'zh-CN'))
            break

          default:
            result[e.prop] = Random.date()
            break
        }
        break

      case FORM_TYPE.TIME:
        switch (e.type) {
          case TIME_TYPE.SELECT:
            result[e.prop] = Random.time()
            break

          // case TIME_TYPE.PICKER:
          //     result[e.prop] = formatTime(Date.now(), 'YYYY-MM-DD') + " " + Random.time()
          //     break;

          default:
            if (!e.isRange) {
              result[e.prop] =
                formatTime(Date.now(), 'YYYY-MM-DD') + ' ' + Random.time()
            } else {
              result[e.prop] = [
                formatTime(Date.now(), 'YYYY-MM-DD') + ' ' + Random.time(),
                formatTime(Date.now(), 'YYYY-MM-DD') + ' ' + Random.time(),
              ].sort((a, b) => a.localeCompare(b, 'zh-CN'))
            }
            break
        }
        break

      case FORM_TYPE.SELECT:
        if (e.options) {
          const temp = []
          for (const iterator of e.options.filter((i) => !i.disabled)) {
            temp.push(iterator[e.optionValue || 'value'])
          }

          if (!e.multiple) {
            if (!e.valueKey) {
              result[e.prop] = Random.pick(temp)
            } else {
              result[e.prop] = Random.pick(e.options)
            }
          } else {
            if (!e.valueKey) {
              const ret = getRandomElements(temp)
              if (!e.valueFormat) {
                result[e.prop] = ret
              } else {
                result[e.prop] = ret.join(e.valueFormat)
              }
            } else {
              const ret = getRandomElements(e.options)
              result[e.prop] = ret
            }
          }
        } else {
          // no options passed in
          console.warning('no options passed in')
        }
        break

      case FORM_TYPE.SWITCH:
        if (!e.activeValue && !e.inactiveValue) {
          result[e.prop] = Random.boolean()
        } else {
          result[e.prop] = Random.pick([e.activeValue, e.inactiveValue])
        }
        break

      case FORM_TYPE.TAG:
        const arr = Array.from(new Set([...Random.cword(3, 8).split('')]))
        if (e.valueFormat) {
          result[e.prop] = arr.join(',')
        } else {
          result[e.prop] = arr
        }
        break

      case FORM_TYPE.CHECKBOX:
        if (!e.multiple) {
          result[e.prop] = Random.boolean()
        } else {
          const temp = []
          for (const iterator of e.options.filter((i) => !i.disabled)) {
            temp.push(iterator[e.optionValue || 'value'])
          }

          const ret = getRandomElements(temp)
          if (!e.valueFormat) {
            result[e.prop] = ret
          } else {
            result[e.prop] = ret.join(e.valueFormat)
          }
        }
        break

      case FORM_TYPE.RADIO:
        const temp = []
        for (const iterator of e.options.filter((i) => !i.disabled)) {
          temp.push(iterator[e.optionValue || 'value'])
        }

        result[e.prop] = Random.pick(temp)
        break

      case FORM_TYPE.TREE:
        // console.log(findNodeById("5de86e8b68de45281460c1f9", e.data, e.nodeKey, e.props));
        // console.log(treeToArr(e.data, e.nodeKey, e.props, true));

        const idArr = treeToArr(e.data, e.nodeKey, e.props, true)

        if (e.multiple) {
          result[e.prop] = [Random.pick(idArr)]
        } else {
          result[e.prop] = Random.pick(idArr)
        }
        break

      default:
        break
    }
  }

  return result
}
