import axios from 'axios';
import endpoints from '../helpers/endpoints';

const signIn = async (credencial, password) => {
	try {
		const res = await axios.post(`${endpoints.BASE_URL}${endpoints.SIGNIN_URL}`, {
			credencial,
			password,
		});
		console.log('SignIn', res);
	} catch (e) {
		console.error('Client Error:', e);
	}
};

const signOut = async () => {
	try {
		const res = await axios.get(`${endpoints.BASE_URL}${endpoints.SIGNOUT_URL}`);
		console.log('SignOut', res);
	} catch (e) {
		console.error('Client Error:', e);
	}
};

const signUp = async (cpf, email, password, firstName, lastName, phone) => {
	try {
		const res = await axios.post(`${endpoints.BASE_URL}${endpoints.SIGNUP_URL}`, {
			cpf,
			email,
			password,
			firstName,
			lastName,
			phone,
		});
		console.log('SignUp', res);
	} catch (e) {
		console.error('Client Error:', e);
	}
};

export { signIn, signOut, signUp };