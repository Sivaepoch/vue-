import Qs from 'qs'
export default{
	  baseURL: 'https://o2o.jhcms.cn/api.php',
	  method:'POST',
	  headers: {'Content-Type':'application/x-www-form-urlencoded'},
	  paramsSerializer: function(params) {
	    data = Qs.stringify({});
	    return data;
	  }],
	  transformResponse: [function (data) {
	    return data;
	  }],
  	data: {
    	
  	},

	  
	timeout: 1000,

	  
	withCredentials: false, // default

	  
	responseType: 'json', // default

	 
	  
	onUploadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},

	  
	onDownloadProgress: function (progressEvent) {
	    // Do whatever you want with the native progress event
	},

	  
	maxContentLength: 2000,

	  
	validateStatus: function (status) {
	    return status >= 200 && status < 300; // default
	},

	  
	maxRedirects: 5, // default
}
