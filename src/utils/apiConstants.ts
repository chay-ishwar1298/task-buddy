// Constants for HTTP methods
export const apiMethods = {
	get: 'get',
	patch: 'patch',
	post: 'post',
	put: 'put',
	delete: 'delete',
}

export const baseEndPoints = {
	version: '/v1',
}
// Constants for common API headers
export const apiHeaders = {
	acceptType: 'application/json',
	preventDefaultLoader: 'prevent-default-loader',
	preventDefaultToastSuccess: 'prevent-default-toast-success',
	preventDefaultToastFailure: 'prevent-default-toast-failure',
	today: 'today',
	timezone: 'timezone',
	appVersion: 'version-no',
	authToken: 'authToken',
	language: 'language',
	deviceType: 'devicetype',
	accessToken: 'accessToken',
	refreshApi: 'refreshApi',
	contentType: 'Content-Type',
	uploadToS3: 'uploadToS3',
}
const initialEndPoints = {
	logout: `/admin${baseEndPoints.version}/admin-logout`,
	login: `/admin${baseEndPoints.version}/admin-login`,
	dashboard: `/admin${baseEndPoints.version}/fetch-stats`,
}

export const getEndPoints = () => {
	return initialEndPoints
}

// Constants for API endpoints
export const apiEndPoints = getEndPoints()
