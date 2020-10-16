

// // 下划线转换驼峰
// function line2Camel(str, type = "_") {
//     const regex = type === "_" ? /\_(\w)/g : /\-(\w)/g
//     return str.replace(regex, function (all, letter) {
//         return letter.toUpperCase();
//     });
// }

// // 驼峰转换下划线
// function camel2Line(str, type = "_") {
//     return str.replace(/([A-Z])/g, `${type}$1`).toLowerCase();
// }

// // 测试
// let a = 'a_b2_345_c2345';
// console.log(line2Camel(a));

// let b = 'aBdaNf';
// console.log(camel2Line(b));


const arr = [
    {
        id: 0,
        label: 'root',
        parentId: 999
    },
    {
        id: 1,
        label: '1-1',
        parentId: 0
    },
    {
        id: 2,
        label: '1-2',
        parentId: 0
    },
    {
        id: 3,
        label: '1-3',
        parentId: 0
    },
    {
        id: 4,
        label: '1-4',
        parentId: 0
    },
    {
        id: 5,
        label: '1-1-1',
        parentId: 1
    },
    {
        id: 6,
        label: '1-1-2',
        parentId: 1
    },
    {
        id: 7,
        label: '1-2-1',
        parentId: 2
    },
    {
        id: 8,
        label: '1-2-2',
        parentId: 2
    }
]

// 构造tree
const arrToTree = (
    data,
    rootId,
    needRoot = false,
    prop = {
        id: 'id',
        label: 'label',
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

console.log(arrToTree(arr, 0, true));
