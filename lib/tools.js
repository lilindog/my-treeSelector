export default {

	//初始化所有节点的$hasChild属性
	initAllChild (list) {
		//1.设置所有节点有无子节点
		//2.所有拥有子节点的节点设置为收起
		//3.仅仅展示根节点
		list.forEach(item => {
			if (this.hasChildNode(list, item.$id)) {
				item.$has_child = true;
				
			} else {
				item.$has_child = false;
			}
			if(item.$display === undefined) {
				item.$display = true;//默认是否显示
				item.$unfold = false;//默认是否展开
				this.hideOrShowAllchild(list, item, false);
			}
		});
	},

	/**
	 * @description 展开选中 
	 */
	unfoldSelected (list, value) {
		//展开、显示所有子节点
		let ids = [], node = this.getNodeFromValue(list, value);
		if (!node) return;
		if (node && this.hasChildNode(list, node.$id)) {
			// console.log(node);
			node.$has_child && (node.$unfold = true);
			ids.push(node.$id);
			f.call(this);
		} else {
			node.$display = true;
		}
		function f () {
			for (let i of list) {
				if (i.$parent_id === ids[ids.length - 1]) {
					// console.log(i.value);
					i.$display = true;
					i.$has_child && (i.$unfold = true);
					if (this.hasChildNode(list, i.$id)) {
						ids.push(i.$id);
						f.call(this);
						ids.pop();
					}
				}
			}
		}

		//展开、显示父节点（如果有）
		parent = this.getParent(list, node.value);
		f1.call(this, parent);

		function f1 (parent) {
			if (!parent) return;
			parent.$display = true;
			parent.$unfold = true;
			for (let i of list) {
				// console.log(i);
				if (i.$parent_id === parent.$id) {
					i.$display = true;
				}
			}
			parent = this.getParent(list, parent.value);
			f1.call(this, parent);
		}
	},

	/**
	 * @description 勾选
	 * @param {Array} list 数据
	 * @param {*} value 要选中的value
	 */
	select(list, value) {

		//选中自己
		let self = this.getNodeFromValue(list, value);
		self && (self.$selected = 2);

		//选中所有子分类节点（如果有）
		this.selectedAllChildNode(list, value, 2);

		//判断同层级选中情况（半选、全选、一个没选）；并设置父级节点的选中状态
		let 
		selectCode = this.getSelecteCode(list, value),
		parent = this.getParent(list, value);

		if (!parent) return;

		parent.$selected = selectCode;
		f.call(this, parent);

		//递归向上处理选中
		function f (parent) {
			let selectCode = this.getSelecteCode(list, parent.value);
			parent = this.getParent(list, parent.value);
			if (parent) {
				parent.$selected = selectCode;
			} else {
				return;
			}
			f.call(this, parent);
		}
		
	},

	/**
	 * @description 取消勾选
	 * @param {Array}  list 数据
	 * @param {*} value 要取消勾选节点的值
	 */
	unSelect (list, value) {

		//取消自己的选择
		this.getNodeFromValue(list, value).$selected = 0;

		//递归取消选择所有子分类节点（如果有）
		this.selectedAllChildNode(list, value, 0);

		//同级别全部没选，取消父级选择，父级继续向上递归
		let 
		selectCode = this.getSelecteCode(list, value);
		parent = this.getParent(list, value);

		if (!parent) return;

		parent.$selected = selectCode;

		//递归向上处理
		function f (parent) {
			let selectCode = this.getSelecteCode(list, parent.value);
			console.log(selectCode, parent.lable);
			parent = this.getParent(list, parent.value);
			if (parent) {
				parent.$selected = selectCode;
			} else {
				return;
			}
			f.call(this, parent);
		}
		f.call(this, parent);
	},

	//应对vue渲染函数报webpack打包模块报错的问题
	test () {
		return (...args) => {
			this.hideOrShowAllchild(...args);
		}
	},

	//隐藏(收起)、显示（展开）指定节点的所有子节点（如果有）
	hideOrShowAllchild (list, node, state = true) {
		let ids = [];
		if (this.hasChildNode(list, node.$id)) {
			ids.push(this.getNodeFromValue(list, node.value).$id);
		} else {
			return;
		}
		f.call(this);
		function f () {
			for (let i of list) {
				if (i.$parent_id === ids[ids.length -1]) {
					i.$unfold = state;
					i.$display = state;
					if (this.hasChildNode(list, i.$id)) {
						ids.push(i.$id);
						f.call(this);
						ids.pop();
					}
				}
			}
		}
	},

	//收起，展开该节点的下一层级（如果有）
	hideOrShowChild (list, node, state = true) {
		if (this.hasChildNode(list, node.$id)) {
			for (let i of list) {
				if (i.$parent_id === node.$id) {
					i.$display = state;
				}
			}
		} else {
			return;
		}
	},

	//获取选中的value集合
	getSelectedValues (list) {
		list = JSON.parse(JSON.stringify(list));
		
		//循环list，当前指针节点已选中时候，则递归其子节点全部标记删除。
		let ids = [];//存储当前父节点id
		
		//循环list
		for (let i of list) {
			if (!i._deleted && i.$selected === 2) {
				ids.push(i.$id);
				f.call(this);
				ids.pop();
			}
		}

		//获取选中的、没有标记删除的节点
		list = list.filter(item => {
			return (!item._deleted && item.$selected === 2);
		});

		return list;

		function f () {
			for (let i of list) {
				if (i.$parent_id === ids[ids.length - 1]) {
					i._deleted = true;
					if (hasChildNode(i.$id)) {
						ids.push(i.$id);
						f.call(this);
						ids.pop();
					}
				}
			}
		}
		function hasChildNode (id) {
			for (let i of list) {
				if (i.$parent_id === id) {
					return true;
				}
			}
			return false;
		}
	},

	//树形转线性
	treeToList (list) {
		let arr = [], index = 0, pathStack = [], result = [];
		list.forEach(item => {
			f.call(this, item);
			result.push(arr);
			arr = [];
		});	
		return result;
		function f (node) {
			index ++;

			let data = {
				lable: node.label,
				value: node.value,
				$deep: pathStack.length,
				$id: index
			}
			if (pathStack.length > 0) {
				data.$parent_id = pathStack[pathStack.length - 1];
			}
			
			arr.push(data);

			if (node.children && node.children.length) {
				pathStack.push(data.$id);
				node.children.forEach(item => {
					f.call(this, item);
				});
				pathStack.pop();
			}
		}
	},

	/**
	 * @description 获取指定value的节点
	 */
	getNodeFromValue (list, value) {
	 	for (let i of list) {
	 		if (i.value === value) return i;
		 }
		 return null;
	 },

	/**
	 * @description 获取指定value的父节点id
	 * @param {*} value 
	 * @return {Object}
	 */
	getParent (list, value) {
		let parentId = null;
	 	for (let i of list) {
			if (i.value === value) {
				parentId = i.$parent_id;
				break;
			}
		}
		if (parentId !== null) {
			for (let i of list) {
				if (i.$id === parentId) return i;
			}
		}
		return null;
	},


	/**
	 * @description 递归设置指定值节点的所有子节点选中状态
	 */
	selectedAllChildNode (list, value, code = 2) {
		let ids = [];
		for (let i of list) {
			if (i.value === value) {
				i.$selected = code;
				ids.push(i.$id);
				f.call(this);
			}
		}
		function f () {
			for (let i of list) {
				if (i.$parent_id === ids[ids.length - 1]) {
					i.$selected = code;
					if (hasChildNode(i.$id)) {
						ids.push(i.$id);
						f.call(this);
						ids.pop();
					}
				}
			}
		}
		function hasChildNode (id) {
			for (let i of list) {
				if (i.$parent_id === id) {
					return true;
				}
			}
			return false;
		}
	},

	/**
	 * @description 获取同层级选中情况
	 * @param {Array} list 线性结构
	 * @return {Number} //0一个没选，1部分选择，2全选
	 */
	getSelecteCode (list, value) {
		console.log(value);
		let nodeNum = 0, state0Num = 0, state1Num = 0, state2Num = 0;
		for (let i of list) {
			if (i.value === value) {
				for (let j of list) {
					if (j.$parent_id === i.$parent_id) {
						nodeNum += 1;
						if (j.$selected === undefined || j.$selected === 0) {
							state0Num += 1;
						}
						if (j.$selected === 1) {
							state1Num += 1;
						} 
						if (j.$selected === 2) {
							state2Num += 1;
						}
					}
				}
				break;
			}
		}
		// console.log("同级节点："+nodeNum, "没选的节点：" + state0Num, "半选的节点："+state1Num, "全选的节点："+state2Num);
		if (state0Num === nodeNum) {
			// console.log("状态0");
			return 0;
		}
		if (state1Num > 0) {
			// console.log("状态1");
			return 1;
		}
		if (state2Num > 0 && state2Num < nodeNum) {
			// console.log("状态1");
			return 1;
		}
		if (state2Num === nodeNum){
			// console.log("状态2");
			return 2;
		}
		// console.error("^_^");
	},

	/**
	 * @description 查找指定id是否有子节点 
	 */
	hasChildNode (list, id) {
		for (let i of list) {
			if (i.$parent_id === id) {
				return true;
			}
		}
		return false;
	}
}