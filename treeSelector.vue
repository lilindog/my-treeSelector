<template>
	<div class="tree-selector">

		<div v-for="(item, index) in list" :key="index">

			<div class="row" 
			v-for="(item, index) in item" 
			:key="index" 
			:style="'margin-left:' + (item.$deep * 30) + 'px;height:'+sizeDict[size]+'px;line-height:'+sizeDict[size]+'px'" 
			v-if="item.$display"
			>

					<!-- 左侧展开、收起符号 -->
					<template v-if="item.$has_child">
						<div v-if="item.$unfold" class="icon iconfont icon-xiayibu icon-open" @click="unflodOrPackup(item.value, false)"
						:style="'height:'+sizeDict[size]+'px;width:'+sizeDict[size]+'px;line-height:'+sizeDict[size]+'px;font-size:'+(sizeDict[size]/2)+'px'"
						></div>
						<div v-else class="icon iconfont icon-xiayibu" @click="unflodOrPackup(item.value, true)"
						:style="'height:'+sizeDict[size]+'px;width:'+sizeDict[size]+'px;line-height:'+sizeDict[size]+'px;font-size:'+(sizeDict[size]/2)+'px'"
						></div>
					</template>
					<div v-else class="icon"
					:style="'height:'+sizeDict[size]+'px;width:'+sizeDict[size]+'px;line-height:'+sizeDict[size]+'px;font-size:'+(sizeDict[size]/2)+'px'"
					></div>

					<!-- 选择框 -->
					<div v-if="item.$selected === 2" class="check-box iconfont icon-dagou" style="background: #409efe" @click="select(item.value, true)"
					:style="'height:'+(sizeDict[size]-5)+'px;width:'+(sizeDict[size]-5)+'px;line-height:'+(sizeDict[size]-5)+'px;'"
					></div>
					<div v-else-if="item.$selected === 1" class="check-box" style="background: #409efe" @click="select(item.value, false)"
					:style="'height:'+(sizeDict[size]-5)+'px;width:'+(sizeDict[size]-5)+'px;line-height:'+(sizeDict[size]-5)+'px;'"
					>-</div>
					<div v-else class="check-box" @click="select(item.value, false)"
					:style="'height:'+(sizeDict[size]-5)+'px;width:'+(sizeDict[size]-5)+'px;line-height:'+(sizeDict[size]-5)+'px;'"
					></div>
					
					<!-- 文本 -->
					<div class="text" 
					:style="'font-size:'+(sizeDict[size]/2)+'px;line-height:'+(sizeDict[size])+'px;padding-left:'+(sizeDict[size]/10)+'px'"
					>{{item.lable}}</div>

			</div>

		</div>

	</div>
</template>
<script>
import _ from "./treeSelector.js";
export default _;
</script>
<style lang="less" scoped>
@import "./treeSelector.less";
</style>