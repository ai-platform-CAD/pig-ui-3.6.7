import request from '@/router/axios'

let baseurl = '/operator/orchestration';

export function fetchList(query) {
    return request({
        url: baseurl + '/page',
        method: 'get',
        params: query
    })
}

export function addObj(obj) {
    return request({
        url: baseurl,
        method: 'post',
        data: obj
    })
}

export function getObj(id) {
    return request({
        url: baseurl + '/' + id,
        method: 'get'
    })
}

export function delObj(id) {
    return request({
        url: baseurl + '/' + id,
        method: 'delete'
    })
}

export function putObj(obj) {
    return request({
        url: baseurl,
        method: 'put',
        data: obj
    })
}
