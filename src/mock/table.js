
'use strict'

const Mock = require('mockjs')
const Random = Mock.Random

const tableData = []

for (let i = 0; i < 30; i++) {
    const template = {
        // 'Boolean': Random.boolean(), // 可以生成基本数据类型
        // 'Natural': Random.natural(1, 10), // 生成1到100之间自然数
        // 'Integer': Random.integer(1, 100), // 生成1到100之间的整数
        // 'Float': Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位
        // 'Character': Random.character(), // 生成随机字符串,可加参数定义规则
        // 'String': Random.string(2, 10), // 生成2到10个字符之间的字符串
        // 'Range': Random.range(0, 10, 2), // 生成一个随机数组
        // 'Date': Random.date(), // 生成一个随机日期,可加参数定义日期格式
        // 'Image': Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据
        // 'Color': Random.color(), // 生成一个颜色随机值
        // 'Paragraph': Random.paragraph(2, 3), // 生成2至3个句子的文本
        // 'Name': Random.name(), // 生成姓名
        // 'Url': Random.url(), // 生成web地址
        // 'Address': Random.province() // 生成地址
        'name': Random.cname(),
        'age': Random.integer(20, 50),
        'sex': Random.pick(['男', '女']),
        'birth': Random.date(),
        'status': Random.boolean(),
        'describe': Random.csentence(),
        'country': Random.county(),
        'province': Random.province(),
        'city': Random.city(),
        'site': Random.url()
    }

    tableData.push(template)
}

const list = (query) => {
    const num = query.pageNum
    const size = query.pageSize
    const total = tableData.length
    return {
        data: tableData.slice((num - 1) * size, (num - 1) * size + size),
        total
    }
}

export default list

