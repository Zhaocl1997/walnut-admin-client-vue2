
'use strict'

/**
 * 平铺树
 * 两种返回值 1、节点数组 2、ID数组
 * @param {Array} data 树结构数组
 * @param {String} nodeKey 唯一key，默认id
 * @param {Object} prop children和label字段key，默认值如下
 * @param {Boolean} onlyId 是否返回ID数组，默认false
 * @return {Array}
 */
export const treeToArr = (
    data,
    nodeKey = 'id',
    prop = {
        children: 'children',
        label: 'label'
    },
    onlyId = false
) => {
    const retTarget = []
    const retId = []

    const toArr = data => {
        for (let item of data) {
            const childrens = item[prop.children]
            retTarget.push(item)

            if (childrens) {
                toArr(childrens)
            }
        }
    }

    toArr(data)

    if (onlyId) {
        retTarget.map(i => {
            retId.push(i[nodeKey])
        })
    }

    return onlyId ? retId : retTarget
}


/**
 * 递归树
 * 两种返回值 1、带根节点 2、不带根节点
 * @param {Array} data 要构造的数组
 * @param {String | Number} rootId 根节点ID
 * @param {Boolean} needRoot 返回结果是否需要根节点，默认false
 * @param {Object} prop id、parentId和children字段key，默认值如下
 * @return {Object | Array}
 */
export const arrToTree = (
    data,
    rootId,
    needRoot = false,
    prop = {
        id: 'id',
        parentId: 'parentId',
        children: 'children'
    }
) => {
    const root = data.find(i => i[prop.id] == rootId)

    const toTree = (data, pid) => {
        const ret = []
        let temp = []

        for (let i = 0; i < data.length; i++) {
            if (data[i][prop.parentId] == pid) {
                let obj = data[i];

                temp = toTree(data, data[i][prop.id]);

                if (temp.length > 0) {
                    obj[prop.children] = temp;
                }

                ret.push(obj);
            }
        }

        return ret
    }

    root[prop.children] = toTree(data, rootId)

    return needRoot ? root : toTree(data, rootId)
}

/**
 * 通过ID在树中查找节点
 * 两种返回值 1、布尔值 2、节点对象
 * @param {String | Number} id 想要查找的节点ID
 * @param {Array} data 树结构数组
 * @param {String} nodeKey 唯一key，默认id
 * @param {Object} prop children和label字段key，默认值如下
 * @param {Boolean} onlyTarget 是否返回节点元素，默认false
 * @return {Object | Boolean}
 */
export const findNodeById = (
    id,
    data,
    nodeKey = 'id',
    prop = {
        children: 'children',
        label: 'label'
    },
    onlyTarget = false
) => {
    let hasFound = false
    let ret = {}

    const findNode = data => {
        if (Array.isArray(data) && !hasFound) {
            data.forEach(item => {
                if (item[nodeKey] === id) {
                    ret = item
                    hasFound = true
                } else if (item[prop.children]) {
                    findNode(item[prop.children])
                }
            })
        }
    }

    findNode(data)

    return onlyTarget ? ret : hasFound
}


