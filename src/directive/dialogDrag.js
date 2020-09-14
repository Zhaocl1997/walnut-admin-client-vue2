/* eslint-disable */
/**
* 拖拽の王
*/

'use strict'

const countV = v => {
    let newV = 0
    if (v.includes('%')) {
        newV = +document.body.clientWidth * (+v.replace(/\%/g, '') / 100)
    } else {
        newV = +v.replace(/\px/g, '')
    }
    return newV
}

/*
*  使用方法
*  将以下代码复制到一个js文件中，然后在入口文件main.js中import引入即可；
*  给elementUI的dialog上加上 v-dialogDrag 指令就可以实现弹窗的全屏和拉伸了。
*  给dialog设置 :close-on-click-modal="false" , 禁止点击遮罩层关闭弹出层
*  如果是form表单，不要将提交等按钮放置el-form-item，以免在上下拉伸时被隐藏
*/

export default {
    bind(el, binding, vnode, oldVnode) {
        const options = {
            draggable: false,
            fullscreen: false,
            dragwidth: false
        }

        const { value } = binding

        if (value.includes("draggable")) {
            options.draggable = true
        }

        if (value.includes("fullscreen")) {
            options.fullscreen = true
        }

        if (value.includes("dragwidth")) {
            options.dragwidth = true
        }


        // 弹框可拉伸最小宽高
        let minWidth = 0
        let minHeight = 500

        // 初始非全屏
        let isFullScreen = false

        // 当前宽高
        let nowWidth = 0
        let nowHight = 0

        // 当前顶部高度
        let nowMarginTop = 0

        // 获取弹框头部（这部分可双击全屏）
        const dialogHeaderEl = el.querySelector('.el-dialog__header')

        // 弹窗
        const dragDom = el.querySelector('.el-dialog')
        minWidth = countV(dragDom.style.width)

        // 给弹窗加上overflow auto；不然缩小时框内的标签可能超出dialog
        dragDom.style.overflow = "auto"

        // 清除选择头部文字效果
        // dialogHeaderEl.onselectstart = new Function("return false")

        // 头部加上可拖动cursor
        if (options.draggable) {
            dialogHeaderEl.style.cursor = 'move'
        }

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null)
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

        let moveDown = e => {

            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft
            const disY = e.clientY - dialogHeaderEl.offsetTop

            // 获取到的值带px 正则匹配替换
            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            const styL = countV(sty.left)
            const styT = countV(sty.top)

            const screenWidth = window.innerWidth // body当前宽度
            const screenHeight = window.innerHeight // 可见区域高度(应为body高度，可某些环境下无法获取)
            const dragDomWidth = dragDom.offsetWidth // 对话框宽度
            const dragDomheight = dragDom.offsetHeight // 对话框高度
            const minDragDomLeft = dragDom.offsetLeft
            const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
            const minDragDomTop = dragDom.offsetTop
            const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight

            document.onmousemove = function (moveEvt) {
                // 通过事件委托，计算移动的距离
                let l = moveEvt.clientX - disX
                let t = moveEvt.clientY - disY

                // 边界处理
                if (-l > minDragDomLeft) {
                    l = -minDragDomLeft;
                } else if (l > maxDragDomLeft) {
                    l = maxDragDomLeft;
                }
                if (-t > minDragDomTop) {
                    t = -minDragDomTop;
                } else if (t > maxDragDomTop) {
                    t = maxDragDomTop;
                }

                // 移动当前元素
                dragDom.style.cssText += `;left:${l + styL}px;top:${t + styT}px;`;
            }

            document.onmouseup = function (upEvt) {
                document.onmousemove = null
                document.onmouseup = null
            }
        }

        // 拖拽
        if (options.draggable) {
            dialogHeaderEl.onmousedown = moveDown
        }

        // 全屏
        if (options.fullscreen) {
            dialogHeaderEl.ondblclick = dbEvt => {
                if (isFullScreen == false) {
                    nowHight = dragDom.clientHeight
                    nowWidth = dragDom.clientWidth
                    nowMarginTop = dragDom.style.marginTop

                    dragDom.style.left = 0
                    dragDom.style.top = 0

                    dragDom.style.height = "100VH"
                    dragDom.style.width = "100VW"
                    dragDom.style.marginTop = 0
                    dragDom.style.marginBottom = 0

                    isFullScreen = true

                    dialogHeaderEl.style.cursor = 'initial'
                    dialogHeaderEl.onmousedown = null
                } else {
                    dragDom.style.height = "auto"
                    dragDom.style.width = nowWidth + 'px'
                    dragDom.style.marginTop = nowMarginTop

                    isFullScreen = false

                    dialogHeaderEl.style.cursor = 'initial'
                    dialogHeaderEl.onmousedown = null
                }
            }
        }

        // 宽度
        if (options.dragwidth) {
            dragDom.onmousemove = function (e) {
                if (e.clientX > dragDom.offsetLeft + dragDom.clientWidth - 10 || dragDom.offsetLeft + 10 > e.clientX) {
                    dragDom.style.cursor = 'w-resize'
                } else if (el.scrollTop + e.clientY > dragDom.offsetTop + dragDom.clientHeight - 10) {
                    dragDom.style.cursor = 's-resize'
                } else {
                    dragDom.style.cursor = 'default'
                    dragDom.onmousedown = null
                }

                dragDom.onmousedown = (e) => {
                    const clientX = e.clientX
                    const clientY = e.clientY

                    let elW = dragDom.clientWidth
                    let elH = dragDom.clientHeight

                    let EloffsetLeft = dragDom.offsetLeft
                    let EloffsetTop = dragDom.offsetTop

                    dragDom.style.userSelect = 'none'

                    let ELscrollTop = el.scrollTop

                    const screenWidth = window.innerWidth // body当前宽度
                    const screenHeight = window.innerHeight // 可见区域高度(应为body高度，可某些环境下无法获取)

                    // 判断点击的位置是不是为头部
                    if (clientX > EloffsetLeft && clientX < EloffsetLeft + elW && clientY > EloffsetTop && clientY < EloffsetTop + 100) {
                        // 如果是头部在此就不做任何动作，以上有绑定dialogHeaderEl.onmousedown = moveDown
                    } else {
                        document.onmousemove = function (e) {
                            e.preventDefault() // 移动时禁用默认事件

                            // 左侧鼠标拖拽位置
                            if (clientX > EloffsetLeft && clientX < EloffsetLeft + 10) {
                                // 往左拖拽
                                if (clientX > e.clientX) {
                                    dragDom.style.width = elW + (clientX - e.clientX) * 2 + 'px'
                                }

                                // 往右拖拽
                                if (clientX < e.clientX) {
                                    if (dragDom.clientWidth < minWidth) {
                                        return
                                    } else {
                                        dragDom.style.width = elW - (e.clientX - clientX) * 2 + 'px'
                                    }
                                }
                            }

                            // 右侧鼠标拖拽位置
                            if (clientX > EloffsetLeft + elW - 10 && clientX < EloffsetLeft + elW) {

                                // 往左拖拽
                                if (clientX > e.clientX) {
                                    if (dragDom.clientWidth < minWidth) {
                                        return
                                    } else {
                                        dragDom.style.width = elW - (clientX - e.clientX) * 2 + 'px'
                                    }
                                }

                                // 往右拖拽
                                if (clientX < e.clientX) {
                                    if (screenWidth < e.clientX) {
                                        return
                                    }

                                    dragDom.style.width = elW + (e.clientX - clientX) * 2 + 'px'
                                }
                            }

                            // 底部鼠标拖拽位置
                            if (ELscrollTop + clientY > EloffsetTop + elH - 20 && ELscrollTop + clientY < EloffsetTop + elH) {
                                // 往上拖拽
                                if (clientY > e.clientY) {
                                    if (dragDom.clientHeight < minHeight) {
                                        return
                                    } else {
                                        dragDom.style.height = elH - (clientY - e.clientY) * 2 + 'px'
                                    }
                                }

                                // 往下拖拽
                                if (clientY < e.clientY) {
                                    dragDom.style.height = elH + (e.clientY - clientY) * 2 + 'px'
                                }
                            }
                        }

                        // 拉伸结束
                        document.onmouseup = function (e) {
                            document.onmousemove = null
                            document.onmouseup = null
                        }
                    }
                }
            }
        }
    }
}
