if (process.env.NODE_ENV !== 'production') require('dotenv').config();

module.exports = {
	apiUrl: process.env.VUE_APP_API_URL
};
