# vue树形选择器组件

[在线示例](http://lilin.site/demo/demo-treeSelector)

看见element-ui里的树形组件，想用自己的思路强撸一个。熬了2天；完成后在发现element-ui的树形是视图节点递归实现，我的视图是线性的，是在逻辑层面使用了递归算法来实现。

#### 属性
|属性|参数类型|备注|
|-|-|-|
|source|Array|数据库返回的无限极分类数据
|selected|Array|默认选中的数据id集合，如[1,2,3,4]|
|size|String|ui尺寸;可选：mini,small,big|

#### 事件
|事件名|携带参数类型|备注|
|-|-|-|
|change|Array|选择/取消选择时候触发，携带数据为当前所有选中节点的id集合；如[1,2,3,4]|