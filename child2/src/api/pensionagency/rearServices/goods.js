import request from '@/utils/request'
/** 
 * @description: 
 * @fileName: goods.js 
 * @author: 王文涛 
 * @date: 2022-02-25 17:03:38
 * @后台人员:  
*/
export function list(query) {
    return request(
        {
            url: '/logistics-manage/article/list',
            method: 'get',
            params: query
        }
    );
}

/** 
 * @description: 
 * @fileName: goods.js 
 * @author: 王文涛 
 * @date: 2022-02-25 17:29:52
 * @后台人员:  
*/

export function add(query) {
    return request(
        {
            url: '/logistics-manage/article/add',
            method: 'post',
            headers: {
                "Content-Type": "application/json;"
            },
            data: query
        }
    );
}

/** 
 * @description: 
 * @fileName: goods.js 
 * @author: 王文涛 
 * @date: 2022-02-25 17:30:29
 * @后台人员:  
*/

export function update(query,id) {
    return request(
        {
            url: `/logistics-manage/article/update/${id}`,
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
 * @fileName: goods.js 
 * @author: 王文涛 
 * @date: 2022-02-25 17:31:12
 * @后台人员:  
*/
export function deletel(query){
    return request(
        {
            url: `/logistics-manage/article/delete/${query}`,
            method: 'delete'
        }
    );
}