import request from '@/utils/request'
/** 
 * @description: 
 * @fileName: goodsType.js 
 * @author: 王文涛 
 * @date: 2022-02-25 16:32:41
 * @后台人员:  
*/
export function list(query) {
    return request(
        {
            url: '/logistics-manage/articleType/list',
            method: 'get',
            params: query
        }
    );
}

/** 
 * @description: 
 * @fileName: goodsType.js 
 * @author: 王文涛 
 * @date: 2022-02-25 16:49:44
 * @后台人员:  
*/
export function add(query) {
    return request(
        {
            url: '/logistics-manage/articleType/add',
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
 * @fileName: goodsType.js 
 * @author: 王文涛 
 * @date: 2022-02-25 16:50:48
 * @后台人员:  
*/

export function update(query,id) {
    return request(
        {
            url: `/logistics-manage/articleType/update/${id}`,
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
 * @fileName: goodsType.js 
 * @author: 王文涛 
 * @date: 2022-02-25 16:51:38
 * @后台人员: 
 *  
*/
export function deletel(query){
    return request(
        {
            url: `/logistics-manage/articleType/delete/${query}`,
            method: 'delete'
        }
    );
}
/** 
 * @description: 
 * @fileName: goodsType.js 
 * @author: 王文涛 
 * @date: 2022-02-25 17:22:08
 * @后台人员:  
*/
export function all_goods_type(query){
    return request(
        {
            url: '/logistics-manage/articleType/simpleList',
            method: 'get',
        }
    );
}