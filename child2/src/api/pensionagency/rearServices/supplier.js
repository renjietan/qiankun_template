import request from '@/utils/request'
/** 
 * @description: 供应商列表 
 * @fileName: supplier.js 
 * @param {number} current
 * @param {number} size
 * @param {string}  name
 * @author: 王文涛 
 * @date: 2022-02-25 10:56:14
 * @后台人员:  
**/

export function list(query) {
    return request(
        {
            url: '/logistics-manage/supplier/list',
            method: 'get',
            params: query
        }
    );
}
/** 
 * @description: 新增供应商
 * @fileName: supplier.js 
 * @author: 王文涛 
 * @date: 2022-02-25 11:27:42
 * @后台人员:  
*/

export function add(query) {
    return request(
        {
            url: '/logistics-manage/supplier/add',
            method: 'post',
            headers: {
                "Content-Type": "application/json;"
            },
            data: query
        }
    );
}

/** 
 * @description: 修改供应商
 * @fileName: supplier.js 
 * @author: 王文涛 
 * @date: 2022-02-25 11:33:53
 * @后台人员:  
*/

export function update(query,id) {
    return request(
        {
            url: `/logistics-manage/supplier/update/${id}`,
            method: 'patch',
            headers: {
                "Content-Type": "application/json;"
            },
            data: query
        }
    );
}

/** 
 * @description: 
 * @fileName: supplier.js 
 * @author: 王文涛 
 * @date: 2022-02-25 11:40:35
 * @后台人员:  
*/

export function deletel(query){
    return request(
        {
            url: `/logistics-manage/supplier/delete/${query}`,
            method: 'delete'
        }
    );
}