import tools from "./lib/tools.js";
import {json, nodes} from "./lib//testData.js";
export default {
	props: {
		//大小
		size: {
			type: String,
			default: "small"//mini, small, big       
		},
		//展开默认选中
		unfoldSelected: {
			type: Boolean,
			default: true
		},
		//列表数据
		source: {
			type: Array,
			default: []
		},
		//默认选择value集合
		selected: {
			type: Array,
			default: function () {
				return [];
			}
		}
	},
	data () {
		return {
			sizeDict: {
				mini: 20,
				small: 25,
				big: 30,
			},
			list: [],//解析后的线性渲染试图数据
			shadows: []
		}
	},
	mounted () {
		this.init();
	},
	methods: {

		init () {

			if ({}.toString.call(this.source) !== "[object Array]") {
				throw new TypeError("source 的类型必须为数组，并遵循指定的结构");
			}

			//格式化传入list数据
			this.list = this.parseList(this.source);

			//生成shadows
			this.list.forEach(item => {
				this.shadows = [...this.shadows, ...item];
			});

			//初始化个各个节点默认属性以及参数
			tools.initAllChild(this.shadows);

			//初始化默认选中
			this.selected.forEach(item => {
				tools.select(this.shadows, item);
				if (this.unfoldSelected) {
					tools.unfoldSelected(this.shadows, item);
				}
			});
		},

		/**
		 * @description 转换供应商后台提供的list为组件使用的list 
		 */
		parseList (list) {
			list = list.map(item => {
				let obj = {
					lable: item.name,
					value: item.id,
					$id: item.id
				}
				if (item.parent_id !== 0 && item.parent_id !== undefined) {
					obj.$parent_id = item.parent_id;
				}
				return obj;
			});
			let roots = [], notRoots = [];
			list.forEach(item => {
				if (!item.$id) return;
				if (item.$parent_id && Number(item.$parent_id) === 0) {
					roots.push(item);
				} else {
					notRoots.push(item);
				}
			});
			let result = [], arr = [], deep = 0;
			for (let i of roots) {
				i.$deep = 0;
				arr.push(i);
				f.call(this, i);
				arr.length && result.push(arr);
				arr = [];
			}
			function f (node) {
				if (!node.$id) return;
				deep ++;
				for (let i of notRoots) {
					if (i.$parent_id === node.$id) {
						i.$deep = deep;
						arr.push(i);
						f(i);
					}
				}
				deep --;
			}
			return result;
		},

		/**
		 * @description 展开或隐藏点击处理 
		 */
		unflodOrPackup (value, state) {
			// console.log(value, state);
			let node = tools.getNodeFromValue(this.shadows, value);
			if (state) {
				// console.log(1);
				node.$unfold = true;
				tools.hideOrShowChild(this.shadows, node, true);
			} else {
				// console.log(2);
				node.$unfold = false;
				tools.test()(this.shadows, node, false);
			}
			this.updateView();
		},

		/**
		 * @description 选中、取消选中 
		 */
		select (value, state) {
			if (state) {
				tools.unSelect(this.shadows, value);
			} else {
				tools.select(this.shadows, value);
			}
			this.updateView();
			this.triggerChange();
		},

		/**
		 * @description 发送change实事件
		 */
		triggerChange() {
			let values = tools.getSelectedValues(this.shadows);
			this.$emit("change", values);
		},

		//更新视图
		updateView () {
			let _ = this.list;
			this.list = [];
			this.list = _;
		},

		/**
		 * 以下是向外提供的组件方法 ========================================================================================> 
		 */

		/**
		 * @desccription 全选所有
		 */
		allSelected () {
			this.shadows.forEach(item => {
				item.$selected = 2;
			});
			this.updateView();
			this.triggerChange();
		},

		/**
		 * @desccription 取消所有已选择
		 */
		unAllSelected () {
			this.shadows.forEach(item => {
				item.$selected = 0;
			});
			this.updateView();
			this.triggerChange();
		},

		/**
		 * @description 展开所有
		 */
		unfoldAll () {
			this.shadows.forEach(item => {
				item.$display = true;
				item.$unfold !== undefined && (item.$unfold = true);
			});
			this.updateView();
		},

		/**
		 * @description 收起所有展开节
		 */
		foldAll () {
			this.shadows.forEach(item => {
				item.$deep !== 0 && (item.$display = false);
				item.$unfold !== undefined && (item.$unfold = false);
			});
			this.updateView();
		}
	}
}