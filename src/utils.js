/**
 * utils 
 */


// DataSourceClear 清除数据源中无效的数据
export function DataSourceClear(source) {
    let row = source.length
    for (let i = row; i > 0; i--) {
        // 如果数组为空，删除
        if (arrIsEmpty(source[i - 1])) source.pop()
    }
    return source
}

// arrIsEmpty 判断arr中的元素是否都为空
function arrIsEmpty(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != "") {
            return false
        }
    }
    return true
}