
'use strict'

import { MessageBox, Loading } from 'element-ui'

// Loading
export const openLoading = query =>
    Loading.service({
        lock: true,
        fullscreen: false,
        text: "正在努力加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.3)",
        target: document.querySelector(query)
    })


// MessageBox
export const checkBox = async (
    content,
    title = "警告",
    confirmButtonText = "确定",
    cancelButtonText = "取消",
    closeOnClickModal = false,
    type = "warning"
) => await MessageBox
    .confirm(content, title, {
        confirmButtonText,
        cancelButtonText,
        closeOnClickModal,
        type
    })
    .then(action => {
        return action == 'confirm'
    })
    .catch(error => {
        return error == "cancel"
    })
