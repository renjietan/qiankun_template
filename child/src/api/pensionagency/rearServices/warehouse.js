import request from '@/utils/request'
/** 
 * @description:  仓库列表
 * @fileName: warehouse.js 
 * @author: 王文涛 
 * @date: 2022-02-25 15:59:25
 * @后台人员:  
*/
export function list(query) {
    return request(
        {
            url: '/logistics-manage/warehouse/list',
            method: 'get',
            params: query
        }
    );
}
/** 
 * @description: 新增仓库
 * @fileName: warehouse.js 
 * @author: 王文涛 
 * @date: 2022-02-25 15:59:25
 * @后台人员:  
*/
export function add(query) {
    return request(
        {
            url: '/logistics-manage/warehouse/add',
            method:'post',
            headers: {
                "Content-Type": "application/json;"
            },
            data: query
        }
    );
}
/** 
 * @description: 新增仓库
 * @fileName: warehouse.js 
 * @author: 王文涛 
 * @date: 2022-02-25 15:59:25
 * @后台人员:  
*/
export function update(query,id) {
    return request(
        {
            url: `/logistics-manage/warehouse/update/${id}`,
            method:'patch',
            headers: {
                "Content-Type": "application/json;"
            },
            data: query
        }
    );
}

/** 
 * @description: 删除仓库
 * @fileName: supplier.js 
 * @author: 王文涛 
 * @date: 2022-02-25 11:40:35
 * @后台人员:  
*/

export function deletel(query){
    return request(
        {
            url: `/logistics-manage/warehouse/delete/${query}`,
            method: 'delete'
        }
    );
}

/** 
 * @description: 获取所有仓库 
 * @fileName: warehouse.js 
 * @author: 王文涛 
 * @date: 2022-02-25 16:30:20
 * @后台人员:  
*/
export function all_warehouse(query){
    return request(
        {
            url: '/logistics-manage/warehouse/simpleList',
            method: 'get',
        }
    );
}