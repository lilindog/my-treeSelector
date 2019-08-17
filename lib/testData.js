export var json = [
    {
        "id": "1",
        "type": "1",
        "parent_id": "0",
        "name": "玩乐体验"
    },
    {
        "id": "2",
        "type": "1",
        "parent_id": "0",
        "name": "演出体验"
    },
    {
        "id": "3",
        "type": "1",
        "parent_id": "0",
        "name": "美食体验"
    },
    {
        "id": "4",
        "type": "1",
        "parent_id": "0",
        "name": "购物体验"
    },
    {
        "id": "5",
        "type": "1",
        "parent_id": "0",
        "name": "交通"
    },
    {
        "id": "6",
        "type": "1",
        "parent_id": "0",
        "name": "门票"
    },
    {
        "id": "7",
        "type": "1",
        "parent_id": "0",
        "name": "休闲按摩"
    },
    {
        "id": "8",
        "type": "1",
        "parent_id": "0",
        "name": "特色体验"
    },
    {
        "id": "9",
        "type": "1",
        "parent_id": "0",
        "name": "接送机"
    },
    {
        "id": "10",
        "type": "1",
        "parent_id": "0",
        "name": "电话卡"
    },
    {
        "id": "11",
        "type": "1",
        "parent_id": "1",
        "name": "陆地体验"
    },
    {
        "id": "12",
        "type": "1",
        "parent_id": "1",
        "name": "高空体验"
    },
    {
        "id": "101",
        "type": "1",
        "parent_id": "12",
        "name": "单人跳伞"
    },
    {
        "id": "102",
        "type": "1",
        "parent_id": "12",
        "name": "旋翼机体验"
    },
    {
        "id": "103",
        "type": "1",
        "parent_id": "102",
        "name": "单发单人旋翼机"
    },
    {
        "id": "104",
        "type": "1",
        "parent_id": "102",
        "name": "单发双人旋翼机"
    },
    {
        "id": "13",
        "type": "1",
        "parent_id": "1",
        "name": "水上体验"
    },
    {
        "id": "14",
        "type": "1",
        "parent_id": "1",
        "name": "宗教名胜"
    },
    {
        "id": "15",
        "type": "2",
        "parent_id": "0",
        "name": "酒店"
    },
    {
        "id": "16",
        "type": "2",
        "parent_id": "0",
        "name": "民宿"
    },
    {
        "id": "17",
        "type": "1",
        "parent_id": "1",
        "name": "景点景区"
    },
    {
        "id": "18",
        "type": "1",
        "parent_id": "1",
        "name": "一日游产品"
    },
    {
        "id": "19",
        "type": "1",
        "parent_id": "0",
        "name": "本地特产"
    },
    {
        "id": "20",
        "type": "1",
        "parent_id": "19",
        "name": "水果"
    },
    {
        "id": "21",
        "type": "1",
        "parent_id": "19",
        "name": "珍珠"
    },
    {
        "id": "22",
        "type": "1",
        "parent_id": "19",
        "name": "茶壶"
    },
    {
        "id": "23",
        "type": "1",
        "parent_id": "19",
        "name": "泥人"
    },
    {
        "id": "24",
        "type": "1",
        "parent_id": "19",
        "name": "丝绸"
    },
    {
        "id": "25",
        "type": "1",
        "parent_id": "19",
        "name": "酒类"
    },
    {
        "id": "26",
        "type": "1",
        "parent_id": "19",
        "name": "茶叶"
    },
    {
        "id": "27",
        "type": "1",
        "parent_id": "19",
        "name": "百年老字号"
    },
    {
        "id": "28",
        "type": "1",
        "parent_id": "19",
        "name": "特产小吃"
    },
    {
        "id": "29",
        "type": "1",
        "parent_id": "0",
        "name": "文体娱乐"
    },
    {
        "id": "30",
        "type": "1",
        "parent_id": "29",
        "name": "话剧"
    },
    {
        "id": "31",
        "type": "1",
        "parent_id": "29",
        "name": "音乐剧"
    },
    {
        "id": "32",
        "type": "1",
        "parent_id": "29",
        "name": "网球"
    },
    {
        "id": "33",
        "type": "1",
        "parent_id": "29",
        "name": "击剑"
    },
    {
        "id": "34",
        "type": "1",
        "parent_id": "29",
        "name": "羽毛球"
    },
    {
        "id": "35",
        "type": "1",
        "parent_id": "0",
        "name": "优惠特价"
    },
    {
        "id": "36",
        "type": "1",
        "parent_id": "0",
        "name": "导游&翻译"
    },
    {
        "id": "37",
        "type": "1",
        "parent_id": "19",
        "name": "精微绣"
	},

	{
        "id": "",
        "type": "1",
        "parent_id": "11",
        "name": "测试11"
	},
	{
        "id": "",
        "type": "1",
        "parent_id": "12",
        "name": "测试12"
	}
];



//多维树形节点
export let nodes = [
	{
		label: "1",
		value: "1",
		children: [
			{
				label: "1-1",
				value: "1-1",
				children: []
			},
			{
				label: "1-2",
				value: "1-2",
				children: [
					{
						label: "1-2-1",
                        value: "1-2-1",
                        children: [
                            {
                                label: "1-2-1-1",
                                value: "1-2-1-1"
                            },
                            {
                                label: "1-2-1-2",
                                value: "1-2-1-2"
                            }
                        ]
					},
					{
						label: "1-2-2",
                        value: "1-2-2",
                        children: [
                            {
                                label: "1-2-2-1",
                                value: "1-2-2-1"
                            },
                            {
                                label: "1-2-2-2",
                                value: "1-2-2-2"
                            }
                        ]
					}
				]
			},
			{
				label: "1-3",
				value: "1-3",
				children: [
                    {
                        label: "1-3-1",
                        value: "1-3-1"
                    },
                    {
                        label: "1-3-2",
                        value: "1-3-2"
                    },
                    {
                        label: "1-3-3",
                        value: "1-3-3",
                        children: [
                            {
                                label: "1-3-3-1",
                                value: "1-3-3-1",
                            },
                            {
                                label: "1-3-3-2",
                                value: "1-3-3-2",
                            },
                        ]
                    }
                ]
			}
		]
	},
	{
		label: "2",
		value: "2",
		children: [
			{
				label: "2-1",
				value: "2-1",
				children: [],
			},
			{
				label: "2-2",
				value: "2-2",
				children: [],
			}
		]
	}
];