export const foods_record_opt = {
  ry: ["适宜", "过硬", "过软"],
  tw: ["适宜", "味咸", "味淡"],
  fl: ["适宜", "过多", "过少"],
  pcszzp: ["适宜", "一般", "较差"],
}
export const months = [
  {
    label: "一月",
    value: "01"
  },
  {
    label: "二月",
    value: "02"
  },
  {
    label: "三月",
    value: "03"
  },
  {
    label: "四月",
    value: "04"
  },
  {
    label: "五月",
    value: "05"
  },
  {
    label: "六月",
    value: "06"
  },
  {
    label: "七月",
    value: "07"
  },
  {
    label: "八月",
    value: "08"
  },
  {
    label: "九月",
    value: "09"
  },
  {
    label: "十月",
    value: "10"
  },
  {
    label: "十一月",
    value: "11"
  },
  {
    label: "十二月",
    value: "12"
  }
];

export const months_obj = {
  0: "一月",
  1: "二月",
  2: "三月",
  3: "四月",
  4: "五月",
  5: "六月",
  6: "七月",
  7: "八月",
  8: "九月",
  9: "十月",
  10: "十一月",
  11: "十二月",
};

export const months_obj_reverse = {
  "一月": 0,
  "二月": 1,
  "三月": 2,
  "四月": 3,
  "五月": 4,
  "六月": 5,
  "七月": 6,
  "八月": 7,
  "九月": 8,
  "十月": 9,
  "十一月": 10,
  "十二月": 11,
}

//翻身护理措施
export const rollover_score = [{
  label: "扣背排痰2/日",
  value: 1
}, {
  label: "局部按摩",
  value: 2
}, {
  label: "清创换药",
  value: 3
}, {
  label: "使用翻身枕",
  value: 4
}, {
  label: "床铺清理",
  value: 5
}, {
  label: "其他",
  value: 6
}]
//巡视评分
export const patrol_score = [{
  label: "长者房间卫生",
  value: 1
}, {
  label: "长者仪容管理",
  value: 2
}, {
  label: "长者心理照护",
  value: 3
}, {
  label: "晨晚间护理",
  value: 4
}, {
  label: "长者个人卫生清洁",
  value: 5
}, {
  label: "长者沟通与交流",
  value: 6
}, {
  label: "关注长者安全",
  value: 7
}, {
  label: "开窗通风",
  value: 8
}, {
  label: "饮食介护",
  value: 9
}]
// 操作类型 编辑/删除
export const handleType = {
  编辑: "M",
  删除: "D",
  停用: "P",
  恢复: "R"
};
// 操作类型 编辑/删除
export const uploadType = {
  员工头像: "empheadpic",
  员工身份证正面: "empidhead",
  员工身份证反面: "empidtail",
  员工户口本正面: "elderbookletfirst",
  员工户口本反面: "elderbookletoneself",
  增值服务: "avService",
  长者体检报告: " eldermedicalreport",
  长者健康陈述书: "elderhealthstatemen",
  菜品图片: "dishpictures",
  长者日志: "elderlog",
};

//增值服务---收费标准
export const addvalue_fee_type = [
  {
    label: "生活",
    value: "1"
  }
];

//新增或编辑 楼宇/楼层/房间/床位时的 类型
export const buliding_type = {
  楼宇: "s",
  楼层: "f",
  房间: "r",
  床位: "b"
};

// 房间朝向
export const house_direction = [
  {
    label: "北",
    value: "北"
  },
  {
    label: "东北",
    value: "东北"
  },
  {
    label: "东",
    value: "东"
  },
  {
    label: "东南",
    value: "东南"
  },
  {
    label: "南",
    value: "南"
  },
  {
    label: "西南",
    value: "西南"
  },
  {
    label: "西",
    value: "西"
  },
  {
    label: "西北",
    value: "西北"
  }
];

//房间 床位数
export const house_bed_number = [
  {
    label: "单人间",
    value: "单人间"
  },
  {
    label: "双人间",
    value: "双人间"
  },
  {
    label: "四人间",
    value: "四人间"
  },
  {
    label: "六人间",
    value: "六人间"
  }
];

// 是与否
export const isTrue = [
  {
    label: "是",
    value: "1"
  },
  {
    label: "否",
    value: "0"
  }
];

export const fee_type = {
  包房费: "R",
  床位费: "B"
};

export const server_fre = [
  {
    label: "随时",
    value: "S"
  },
  {
    label: "每年",
    value: "Y"
  },
  {
    label: "每月",
    value: "M"
  },
  {
    label: "每周",
    value: "W"
  },
  {
    label: "每天",
    value: "D"
  },
  {
    label: "自定义",
    value: "Z"
  }
];

// 服务状态
export const server_status = [
  {
    label: "使用",
    value: "N"
  },
  {
    label: "停用",
    value: "D"
  }
];
//疾病选项
export const disease_list = [
  {
    value: "1",
    label: "病痛"
  }
];

//日志类型
export const log_type_list = [
  {
    value: "1",
    label: "常见日志"
  }
];

//个人档案
export const tag_list = [
  {
    name: "基本信息",
    components: [
      {
        name: "基本信息",
        component: "BasicInfo"
      }
    ]
  },
  {
    name: "健康履历",
    components: [
      {
        name: "健康评价",
        component: "HealthEval"
      }
    ]
  },
  {
    name: "评估履历",
    components: [
      {
        name: "评估履历",
        component: "Assessment"
      }
    ]
  },
  {
    name: "服务项目",
    components: [
      {
        name: "服务项目",
        component: "ServerProject"
      }
    ]
  },
  {
    name: "服务实施",
    components: [
      {
        name: "服务实施",
        component: "ServerImp"
      }
    ]
  },
  {
    name: "增值服务",
    components: [
      {
        name: "增值服务",
        component: "AddedServer"
      }
    ]
  },
  {
    name: "付款计划",
    components: [
      {
        name: "付款计划",
        component: "PayloadPlan"
      }
    ]
  },
  {
    name: "电子文档",
    components: [
      {
        name: "电子文档",
        component: "Document"
      }
    ]
  },
  {
    name: "合同履历",
    components: [
      {
        name: "合同履历",
        component: "ContractDocument"
      }
    ]
  },
  {
    name: "请假履历",
    components: [
      {
        name: "请假履历",
        component: "Holiday"
      }
    ]
  },
  {
    name: "特殊膳食",
    components: [
      {
        name: "特殊膳食",
        component: "SpecialFoods"
      }
    ]
  },
  {
    name: "长者日志",
    components: [
      {
        name: "长者日志",
        component: "OldManRecord"
      }
    ]
  },
  {
    name: "不良事件",
    components: [
      {
        name: "长者日志",
        component: "NotGoodEvent"
      }
    ]
  },
  {
    name: "退住总结",
    components: [
      {
        name: "退住总结",
        component: "Conclusion"
      }
    ]
  }
];

// 付款计划调整
export const payload_plan_tagList = [
  {
    name: "付款计划调整申请",
    component: "ApplyPayloadPlan"
  },
  {
    name: "付款计划调整审核",
    component: "AuditPayloadPlan"
  },
  {
    name: "付款计划调整办理",
    component: "HandlerPayloadPlan"
  }
];

//服务等级调整
export const resize_server_level_tagList = [
  {
    name: "服务等级调整申请",
    component: "ApplyServerLevel"
  },
  {
    name: "确认付款计划",
    component: "ConfirmPaymentPlan"
  },
  {
    name: "服务等级调整审核",
    component: "AuditServerLevel"
  },
  {
    name: "服务等级调整办理",
    component: "HandlerServerLevel"
  }
];

export const bunk_resize_apply_tagList = [
  {
    name: "床位调整申请",
    component: "ApplyBunkResize"
  },
  {
    name: "确认付款计划",
    component: "ConfirmPaymentPlan"
  },
  {
    name: "床位调整审核",
    component: "AuditBunkResize"
  },
  {
    name: "床位调整办理",
    component: "HandleBunkResize"
  }
];

export const serve_project = [
  {
    name: "全部服务",
    component: "serverAll"
  },
  {
    name: "生活服务",
    component: "serverLife"
  },
  {
    name: "公共服务",
    component: "serverCommon"
  },
  {
    name: "膳食服务",
    component: "serverFoods"
  },
  {
    name: "康复服务",
    component: "serverRehabilitation"
  },
  {
    name: "其他服务",
    component: "serverOther"
  }
];
export const contactList = [
  {
    value: "0",
    label: "监护人"
  },
  {
    value: "1",
    label: "担保人"
  },
  {
    value: "2",
    label: "一般联系人"
  }
];

export const relationList = [
  {
    value: "0",
    label: "父亲"
  },
  {
    value: "1",
    label: "母亲"
  },
  {
    value: "2",
    label: "儿子"
  },
  {
    value: "3",
    label: "配偶"
  },
  {
    value: "4",
    label: "本人"
  },
  {
    value: "5",
    label: "兄妹"
  },
  {
    value: "6",
    label: "兄弟"
  },
  {
    value: "7",
    label: "姐妹"
  },
  {
    value: "8",
    label: "女儿"
  }
];
//营养状况
export const nutritionalStatus = [
  {
    value: "0",
    label: "不指定"
  },
  {
    value: "1",
    label: "良好"
  },
  {
    value: "2",
    label: "一般"
  },
  {
    value: "3",
    label: "较差"
  },
  {
    value: "4",
    label: "很差"
  }
];
//精神状况
export const mentalStatus = [
  {
    value: "0",
    label: "不指定"
  },
  {
    value: "1",
    label: "正常"
  },
  {
    value: "2",
    label: "异常"
  }
];
//生活自理能力
export const selfCareAbility = [
  {
    value: "0",
    label: "不指定"
  },
  {
    value: "1",
    label: "自理"
  },
  {
    value: "2",
    label: "半自理"
  },
  {
    value: "3",
    label: "非自理"
  }
];
//行为能力
export const capacityList = [
  {
    value: "0",
    label: "不指定"
  },
  {
    value: "1",
    label: "有"
  },
  {
    value: "2",
    label: "无"
  }
];

// 兴趣爱好
export const dict = {
  书籍: "book",
  影视: "movies",
  音乐: "music",
  运动: "sports",
  休闲: "free_time",
  养生: "health",
  饮食: "diet",
  农乐: "agritainment"
};

//住房性质

export const live_status_list = [
  {
    value: "0",
    label: "包月"
  },
  {
    value: "1",
    label: "包季"
  }
];
//是否本地户口
export const local_account_list = [
  {
    value: "0",
    label: "是"
  },
  {
    value: "1",
    label: "否"
  }
];
//文化程度
export const education_list = [
  {
    value: "0",
    label: "文盲"
  },
  {
    value: "1",
    label: "小学"
  },
  {
    value: "2",
    label: "初中"
  },
  {
    value: "3",
    label: "高中"
  },
  {
    value: "4",
    label: "大学"
  },
  {
    value: "5",
    label: "研究生"
  },
  {
    value: "6",
    label: "博士"
  }
];
//宗教信仰
export const religious_belief_list = [
  {
    value: "0",
    label: "无"
  },
  {
    value: "1",
    label: "基督教"
  }
];
//是否是残疾人
export const is_disabled_list = [
  {
    value: "0",
    label: "是"
  },
  {
    value: "1",
    label: "否"
  }
];

//政治面貌
export const political_outlook_list = [
  {
    value: "0",
    label: "群众"
  },
  {
    value: "1",
    label: "团员"
  },
  {
    value: "2",
    label: "党员"
  }
];
//婚姻状况
export const marital_status_list = [
  {
    value: "0",
    label: "未婚"
  },
  {
    value: "1",
    label: "已婚"
  },
  {
    value: "2",
    label: "丧偶"
  }
];

//有无子女
export const have_children_list = [
  {
    value: "0",
    label: "有"
  },
  {
    value: "1",
    label: "无"
  }
];
//联系人顺序
export const link_man_list = [
  {
    value: 0,
    label: "主要联系人"
  },
  {
    value: 1,
    label: "次要联系人"
  }
];
//经济收入
export const income_list = [
  {
    value: "0",
    label: "0~1000"
  },
  {
    value: "1",
    label: "1000~2000"
  }
];

//经济状况

export const situation_list = [
  {
    value: "0",
    label: "温饱"
  },
  {
    value: "1",
    label: "小康"
  }
];

export const orignaUnit_list = [
  {
    value: "0",
    label: '国企'
  },
  {
    value: "1",
    label: "事业单位"
  },
  {
    value: "2",
    label: '央企'
  },
  {
    value: '3',
    label: '外企',
  },
  {
    value: '4',
    label: "民营企业"
  }

]

//医疗费用类型
export const medical_expense_type_list = [
  {
    value: "0",
    label: "有医保"
  },
  {
    value: "1",
    label: "无医保"
  }
];
//收养类型
export const adoption_type_list = [
  {
    value: "0",
    label: "部分"
  },
  {
    value: "1",
    label: "完全"
  }
];
// 入住体检 菜单
export const tabs = [
  {
    name: "健康评价",
    component: "HealthEval"
  },
  {
    name: "生活习惯",
    component: "Livingstatus"
  },
  {
    name: "既往病史",
    component: "Hobby"
  },
  {
    name: "体格检查",
    component: "Linkman"
  },
  {
    name: "辅助检查",
    component: "Result"
  }
];

//

export const evaluation_level_list = [
  {
    label: "能力完好",
    value: "0"
  },
  {
    label: "轻度失能",
    value: "1"
  },
  {
    label: "中度失能",
    value: "2"
  },
  {
    label: "重度失能",
    value: "3"
  }
];
export const table = [
  { prop: "data", label: "巡视" },
  { prop: "data", label: "选餐" },
  { prop: "data", label: "饮食量" },
  { prop: "data", label: "体温" },
  { prop: "data", label: "血压" },
  { prop: "data", label: "脉搏" },
  { prop: "data", label: "眼药水" },
  { prop: "data", label: "内服药" },
  { prop: "data", label: "睡前药" },
  { prop: "data", label: "口腔护理" },
  { prop: "data", label: "助浴" },
  { prop: "data", label: "洗脚" },
  { prop: "data", label: "擦身" },
  { prop: "data", label: "阴洗" },
  { prop: "data", label: "康复" },
  { prop: "data", label: "排尿" },
  { prop: "data", label: "排便" },
  { prop: "data", label: "翻身" },
  { prop: "data", label: "血糖测量" },
  { prop: "data", label: "便秘药" },
  { prop: "data", label: "排便处理" },
  { prop: "data", label: "医生诊疗" },
  { prop: "data", label: "访客" },
  { prop: "data", label: "外出" },
  { prop: "data", label: "外宿" },
  { prop: "data", label: "体重" },
  { prop: "data", label: "晒被" },
  { prop: "data", label: "换床品" },
];
export const daylist = [
  {
    date: '2021-08-23',
    week: '(周一)',
    times: ['1:00', '2:00', '3:00', '4:00', '5:00'],
  },
  {
    date: '2021-08-24',
    week: '(周二)',
    times: ['1:00', '2:00', '3:00', '4:00', '5:00'],
  },
  {
    date: '2021-08-24',
    week: '(周三)',
    times: ['1:00', '2:00', '3:00', '4:00', '5:00'],
  },
  {
    date: '2021-08-24',
    week: '(周四)',
    times: ['1:00', '2:00', '3:00', '4:00', '5:00'],
  },
  {
    date: '2021-08-24',
    week: '(周五)',
    times: ['1:00', '2:00', '3:00', '4:00', '5:00'],
  },
  {
    date: '2021-08-24',
    week: '(周六)',
    times: ['1:00', '2:00', '3:00', '4:00', '5:00'],
  },
  {
    date: '2021-08-24',
    week: '(周日)',
    times: ['1:00', '2:00', '3:00', '4:00', '5:00'],
  }
]
export const daylists = [
  {
    date: '2021-08-23',
    week: '(周一)',
    times: ['1:00', '2:00'],
  },
  {
    date: '2021-08-24',
    week: '(周二)',
    times: ['1:00', '2:00',],
  },
  {
    date: '2021-08-24',
    week: '(周三)',
    times: ['1:00', '2:00',],
  },
  {
    date: '2021-08-24',
    week: '(周四)',
    times: ['1:00', '2:00'],
  },
  {
    date: '2021-08-24',
    week: '(周五)',
    times: ['1:00', '2:00',],
  },
  {
    date: '2021-08-24',
    week: '(周六)',
    times: ['1:00', '2:00',],
  },
  {
    date: '2021-08-24',
    week: '(周日)',
    times: ['1:00', '2:00',],
  }
]
export const daylist2 = [
  {
    date: '2021-08-23',
    week: '(周一)',
    times: ['小便', '大便'],
  },
  {
    date: '2021-08-24',
    week: '(周二)',
    times: ['小便', '大便'],

  },
  {
    date: '2021-08-24',
    week: '(周三)',
    times: ['小便', '大便'],
  },
  {
    date: '2021-08-24',
    week: '(周四)',
    times: ['小便', '大便'],
  },
  {
    date: '2021-08-24',
    week: '(周五)',
    times: ['小便', '大便'],
  },
  {
    date: '2021-08-24',
    week: '(周六)',
    times: ['小便', '大便'],
  },
  {
    date: '2021-08-24',
    week: '(周日)',
    times: ['小便', '大便'],
  }
]
export const daylist3 = [
  {
    date: '2021-08-23',
    week: '(周一)',
    times: ['血压', '确认'],
  },
  {
    date: '2021-08-24',
    week: '(周二)',
    times: ['血压', '确认'],
  },
  {
    date: '2021-08-24',
    week: '(周三)',
    times: ['血压', '确认'],
  },
  {
    date: '2021-08-24',
    week: '(周四)',
    times: ['血压', '确认'],
  },
  {
    date: '2021-08-24',
    week: '(周五)',
    times: ['血压', '确认'],
  },
  {
    date: '2021-08-24',
    week: '(周六)',
    times: ['血压', '确认'],
  },
  {
    date: '2021-08-24',
    week: '(周日)',
    times: ['血压', '确认'],
  }
]


export const scel_tab = [
  {
    name: '全部人员',
  },
  {
    name: '二楼医护',
  },
  {
    name: '三楼医护',
  },
  {
    name: '行政人员',
  },
  {
    name: '其他人员'
  }
];
export const info =
{
  CM: "综合账户",
  AV: "增值账户",
  MS: '医疗备用金',
  DE: "押金账户"
};

export const from_type = {
  "费用登记": 'from1',
  "拆分金额": "from2",
  "修改费用": 'from3',
  "取消费用": "from4",
}

export const org_type_list = [
  {
    type: 'C',
    desc: 'CCRC'
  },
  {
    type: 'M',
    desc: '机构养老'
  },
  {
    type: 'P',
    desc: '居家养老'
  }
];
export const join_type_list = [
  {
    type: 'D',
    desc: '直营'
  },
  {
    type: 'J',
    desc: '加盟'
  }
];

export const org_type = {
  'C': 'CCRC',
  'M': '机构养老',
  'P': '居家养老'
}
export const join_type = {
  'D': '直营',
  'J': '加盟'
}

export const account_type = {
  'M': '普通员工',
  'P': '机构管理人员',
  'S': '总管理'
}

export const saleStatus = {
  待售: '', //待售
  预留: 'background: #1fcda0;border: 1px solid #1fcda0;color:#fff', //预留
  预订: 'background: #ff8b43; border: 1px solid #ff8b43;color:#fff', //预定
  签约: 'background: #017cff; border: 1px solid #017cff;color:#fff',//签约
  // 解约:'background: #fe3d65; border: 1px solid #fe3d65;color:#fff', //解约
  销控: 'background: #d6d6d6; border: 1px solid #d6d6d6;color:#fff',//销控
  价格失效: 'background: #B25FE6; border: 1px solid #B25FE6;color:#fff',//价格失效
}
export const colorList =   [
  "linear-gradient(90deg, #017CFF 0%, #419DFF 100%)",
  "linear-gradient(270deg, #FFBD48 0%, #FFA708 100%)",
  "linear-gradient(90deg, #FE3D65 0%, #FF5F80 100%)",
  "linear-gradient(90deg, #01D299 0%, #05E5A8 100%)",
  "linear-gradient(90deg, #FF8B43 0%, #FFA36A 100%)"
]
//客户等级
export const Customer_level_list = [
  {
    value: "A",
  },
  {
    value: "B",
  },
  {
    value: "C",
  },
  {
    value: "D",
  },
];
