export function getList({ length = parseInt(Math.random() * 10 + 15), data_model = "" } = {}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let data = Array.from({ length }, (item, index) => {
                return {
                    id: `${data_model}---id---${Math.random()}`,
                    data: `${data_model}---data---${Math.random()}`
                }
            })
            resolve({
                count: 40,
                list: data
            })
        }, 1000)
    })
}

export function getList_food(length = 3) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let data = Array.from({ length }, (item, index) => {
                let d = {

                }
                Array.from({ length: 7 }).map((item, index) => {
                    d[`column${index}`] = {}
                    d[`column${index}`]["count"] = 0
                    // d[`column${index}`]["count"] = parseInt(Math.random() * 200)
                    // return d[`column${index}`]["data"] = Array.from({ length: parseInt(Math.random() * 9 + 1) }, (child, i) => {
                    //     return {
                    //         id: Math.random(),
                    //         name: `牛奶${Math.random()}`,

                    //     }
                    // })
                    return d[`column${index}`]["data"] = []
                })
                return d
            })

            resolve({
                list: data
            })
        }, 1000)
    })
}

export function getList_food_columns(length = 7) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let data = Array.from({ length }, (item, index) => {
                return {
                    id: Math.random(),
                    name: `主食${parseInt(Math.random() * 100)}`,
                    prop: `column${index + 4}`
                }
            })
            let fixed_data = [{
                id: Math.random(),
                name: `床位`,
                prop: `column2`
            }, {
                id: Math.random(),
                name: `姓名`,
                prop: `column3`
            }]
            resolve({
                list: [...fixed_data, ...data]
            })
        }, 1000)
    })
}

export function getList_record(length = 10) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let data = Array.from({ length }, (item, index) => {
                return {
                    id: Math.random(),
                    column2: index == 0 ? parseInt(Math.random() * 40) : `#${parseInt(Math.random() * 100)}-床`,
                    column3: `谭人杰${parseInt(Math.random() * 40)}`,
                    column4: parseInt(Math.random() * 40),
                    column5: parseInt(Math.random() * 40),
                    column6: parseInt(Math.random() * 40),
                    column7: parseInt(Math.random() * 40),
                    column8: parseInt(Math.random() * 40),
                    column9: parseInt(Math.random() * 40),
                    column10: parseInt(Math.random() * 40),
                }
            })
            resolve({
                list: data
            })
        }, 1000)
    })
}

export function valid_record(length = 4) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let data = Array.from({ length }, (item, index) => {
                let res = {}

                let list = Array.from({ length: parseInt(Math.random() * 4) }, () => {
                    return `牛奶${parseInt(Math.random() * 10)}`
                })
                let temp = {
                    0: "早餐",
                    1: "点心",
                    2: "中餐",
                    3: "下午茶",
                    4: "晚餐"
                }
                res.column0 = temp[index]
                res.column1 = list
                res.column2 = parseInt(Math.random())
                res.column3 = parseInt(Math.random() * 3)
                res.column4 = parseInt(Math.random() * 3)
                res.column5 = parseInt(Math.random() * 3)
                res.column6 = parseInt(Math.random() * 3)
                res.column7 = parseInt(Math.random() * 3)
                res.column8 = parseInt(Math.random() * 3)
                res.column9 = parseInt(Math.random() * 3)
                res.column10 = new Date(new Date().setDate(new Date().getDate() + parseInt(Math.random() * 10)))
                res.column11 = parseInt(Math.random())
                return res
            })

            resolve({
                list: data,
                count: 4
            })
        }, 1000)
    })
}
