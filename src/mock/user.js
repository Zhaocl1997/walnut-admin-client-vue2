
'use strict'

import Mock from 'mockjs';

const Random = Mock.Random
const tableData = []
const total = 100

for (let i = 0; i < total; i++) {
    const template = {
        'id': Random.id(),
        'name': Random.cname(),
        'age': Random.integer(20, 50),
        'sex': Random.pick(['男', '女']),
        'status': Random.boolean(),
        'description': Random.csentence(),
        'country': Random.county(),
        'province': Random.province(),
        'city': Random.city(),
        'site': Random.url(),
        'createAt': Random.date(),
        'family': {
            'dad': Random.name(),
            'mom': Random.name(),
        }
    }

    tableData.push(template)
}

export const listUser = (query) => {

    const num = query.pageNum || 1
    const size = query.pageSize || 10
    const total = tableData.length

    return {
        data: tableData.slice((num - 1) * size, (num - 1) * size + size),
        total
    }
}
