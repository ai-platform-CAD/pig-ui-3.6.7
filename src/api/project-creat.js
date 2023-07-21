import request from '@/router/axios'

export function fetchList(query) {
    return request({
        url: '/foo/page',
        method: 'get',
        params: query
    })
}

export function addObj(obj) {
    return request({
        url: '/foo/projectCreat',
        method: 'post',
        data: obj
    })
}

export function getObj(id) {
    return request({
        url: '/foo/projectCreat/' + id,
        method: 'get'
    })
}

export function delObj(id) {
    return request({
        url: '/foo/projectCreat/' + id,
        method: 'delete'
    })
}

export function putObj(obj) {
    return request({
        url: '/demo/projectCreat',
        method: 'put',
        data: obj
    })
}
