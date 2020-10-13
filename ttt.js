

// 下划线转换驼峰
function line2Camel(str, type = "_") {
    const regex = type === "_" ? /\_(\w)/g : /\-(\w)/g
    return str.replace(regex, function (all, letter) {
        return letter.toUpperCase();
    });
}

// 驼峰转换下划线
function camel2Line(str, type = "_") {
    return str.replace(/([A-Z])/g, `${type}$1`).toLowerCase();
}

// 测试
let a = 'a_b2_345_c2345';
console.log(line2Camel(a));

let b = 'aBdaNf';
console.log(camel2Line(b));