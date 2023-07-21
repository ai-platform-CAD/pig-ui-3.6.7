import request from '@/router/axios'

const baseUrl = '/operator/manage';

// 分页查
export function fetchList(query) {
    return request({
        url: baseUrl + '/page',
        method: 'get',
        params: query
    })
}

// ID查
export function getObj(id) {
    return request({
        url: baseUrl + '/' + id,
        method: 'get'
    })
}

// 新增
export function addObj(obj) {
    return request({
        url: baseUrl,
        method: 'post',
        data: obj
    })
}

// ID删除
export function delObj(id) {
    return request({
        url: baseUrl + '/' + id,
        method: 'delete'
    })
}

// 修改
export function putObj(obj) {
    return request({
        url: baseUrl,
        method: 'put',
        data: obj
    })
}

// 该算子名称已经存在
export function isExist(params) {
    return request({
        url: baseUrl + '/check/exist',
        method: 'get',
        params: params
    })
}

// 校验算子名合法性
export const validateOperatorName = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入算子名'))
    }
    const flag = new RegExp(/^([a-z\d]+?)$/).test(value)
    if (!flag) {
        return callback(new Error('算子名支持小写英文、数字'))
    }

    if (window.boxType === 'edit') {
        return callback()
    }

    isExist({operatorName: value}).then(response => {
        const result = response.data.data
        if (result) {
            return callback(new Error('算子已经存在'))
        } else {
            return callback()
        }
    })
}
