
'use strict'

const routes = [
    {
        path: "/redirect",
        hidden: true,
        children: [
            {
                path: "/redirect/:path*"
            }
        ]
    },
    {
        name: "System",
        path: "/system",
        redirect: "noRedirect",
        alwaysShow: true,
        meta: {
            title: "系统管理",
            icon: "setting"
        },
        children: [
            {
                name: "User",
                path: "user",
                meta: {
                    title: "用户管理",
                    icon: "user"
                }
            },
            {
                name: "Role",
                path: "role",
                meta: {
                    title: "角色管理",
                    icon: "peoples"
                }
            },
            {
                name: "Menu",
                path: "menu",
                meta: {
                    title: "菜单管理",
                    icon: "tree-table"
                }
            },
            {
                name: "Post",
                path: "post",
                meta: {
                    title: "岗位管理",
                    icon: "post"
                }
            },
            {
                name: "Dict",
                path: "dict",
                meta: {
                    title: "字典管理",
                    icon: "dict"
                }
            },
            {
                name: "Config",
                path: "config",
                meta: {
                    title: "参数设置",
                    icon: "edit"
                }
            },
            {
                name: "Notice",
                path: "notice",
                meta: {
                    title: "通知公告",
                    icon: "message"
                }
            },
            {
                name: "Log",
                path: "log",
                redirect: "noRedirect",
                alwaysShow: true,
                meta: {
                    title: "日志管理",
                    icon: "log"
                },
                children: [
                    {
                        name: "Operlog",
                        path: "operlog",
                        meta: {
                            title: "操作日志",
                            icon: "form"
                        }
                    },
                    {
                        name: "Logininfor",
                        path: "logininfor",
                        meta: {
                            title: "登录日志",
                            icon: "logininfor"
                        }
                    }
                ]
            }
        ]
    },
    {
        name: "Tool",
        path: "/",
        redirect: "noRedirect",
        alwaysShow: true,
        meta: {
            title: "系统工具",
            icon: "tool"
        },
        children: [
            {
                name: "Build",
                path: "build",
                meta: {
                    title: "表单构建",
                    icon: "build"
                }
            },
            {
                name: "Gen",
                path: "gen",
                meta: {
                    title: "代码生成",
                    icon: "code"
                }
            },
            {
                name: "Swagger",
                path: "swagger",
                meta: {
                    title: "系统接口",
                    icon: "swagger"
                }
            },
            {
                name: "components",
                path: "components",
                meta: {
                    title: "组件库",
                    icon: "component"
                }
            }
        ]
    },
    {
        path: "*",
        redirect: "/404",
        hidden: true
    }
]

export default routes