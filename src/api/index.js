import request from '@/common/request.js'
import { formatGetUri } from '@/common/util.js'
const api = {
	post: (url, params = {}, header) => {
		return request.globalRequest(`${url}`, 'POST', params, header)
	},
	get: (url, params = null, header) => {
		return request.globalRequest(`${url}${params ? formatGetUri(params) : ''}`, 'GET', {}, header)
	},
	delete: (url, params = null, header) => {
		return request.globalRequest(`${url}${params ? formatGetUri(params) : ''}`, 'DELETE', {}, header)
	},
	put: (url, params = {}, header) => {
		return request.globalRequest(`${url}`, 'PUT', params, header)
	},
}
export default api;