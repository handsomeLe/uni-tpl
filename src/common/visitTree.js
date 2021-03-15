/**
 * 遍历树形结构
 * @param tree 数组
 * @param cb 回调
 * @param options 配置
 */
const visitTree = (tree, cb, options) => {
  // 定义一个递归方法
  const deepFn = function(data, parent, deep) {
    for (let i = 0, data_1 = data, len = data_1.length; i < len; i++) {
      const item = data_1[i]
      cb(item, parent, deep)
      // @ts-ignore
      const childrenVal = item[options]
      if (childrenVal && childrenVal.length > 0) {
        deepFn(childrenVal, item, deep + 1)
      }
    }
  }

  deepFn(tree, null, 1)
}

export default visitTree
