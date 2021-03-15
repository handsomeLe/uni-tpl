/**
 * 拼接对象为请求字符串
 * 对于需要编码的文本（比如说中文）我们要进行编码
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 **/
export function formatGetUri(obj) {
	const params = []
	Object.keys(obj).forEach((key) => {
		let value = obj[key]
		if (typeof value !== 'undefined' || value !== null) {
			params.push([key, encodeURIComponent(value)].join('='))
		}
	})
	return '?' + params.join('&')
}

/**
 * 随机生成Id
 **/
export const guid = () => Number(Math.random().toString().substr(3) + Date.now()).toString(36);

/**
 * 当前时间 年-月-日
 **/
export const today = (isShow) => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
	const day = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
	const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();           //获取当前小时数(0-23)
	const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();   //获取当前分钟数(0-59)
	const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();   //获取当前秒数(0-59) 
	let str = ''
	str = `${year}-${month}-${day}`
	if (isShow) {
		str += ` ${hours}:${minutes}:${seconds}`;
	}
	return str;
}

/**
 * 格式化时间为yyyy-MM-dd hh:mm:ss
 * @param {String} format 格式化的样式
 */
export function format(date, format) {
	var o = {
		"M+": date.getMonth() + 1, //month
		"d+": date.getDate(),    //day
		"h+": date.getHours(),   //hour
		"m+": date.getMinutes(), //minute
		"s+": date.getSeconds(), //second
		"q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
		"S": date.getMilliseconds() //millisecond
	}
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o) if (new RegExp("(" + k + ")").test(format))
		format = format.replace(RegExp.$1,
			RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}