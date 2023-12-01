const ip = process.env.EXPO_PUBLIC_IP_ADDRESS;

const endpoints = {
	BASE_URL: `http://${ip}:3000`,
	SIGNIN_URL: '/signin',
	SIGNOUT_URL: '/signout',
	SIGNUP_URL: '/signup',
	PUBLIC_URL: '/public',
	REFRESH_URL: '/refresh',
	RESET_URL: '/reset',

	USERS_URL: '/users',
	USERS_ID_URL: '/users/',
	USERS_UPLOAD_URL: '/users/upload',

	ITEMS_URL: '/items',
	ITEMS_ID_URL: '/items/',
	ITEMS_UPLOAD_ID_URL: '/items/upload/',

	MATCHES_URL: '/matches',
	MATCHES_ID_URL: '/matches/',
};

export default endpoints;
