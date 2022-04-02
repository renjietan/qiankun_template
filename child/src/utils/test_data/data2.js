export const service_list = {
    "公共项目": {
        id: 0,
        type_label: "公共项目",
        children: Array.from({length: 5}, (item,index) => {
            return {
                id: index,
                label: `xxx服务${index}`
            }
        }),
    },
    "生活项目": {
        id: 1,
        type_label: "生活项目",
        children: Array.from({length: 5}, (item,index) => {
            return {
                id: index,
                label: `xxx服务${index}`
            }
        }),
    },
    "娱乐项目": {
        id: 2,
        type_label: "娱乐项目",
        children: Array.from({length: 5}, (item,index) => {
            return {
                id: index,
                label: `xxx服务${index}`
            }
        }),
    }
}