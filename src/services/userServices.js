import axios from 'axios';
import endpoints from '../helpers/endpoints';

const findUser = async () => {
	try {
		const res = await axios.get(`${endpoints.BASE_URL}${endpoints.USER_URL}`);
	} catch (e) {
		console.error('Client Error:', e);
	}
};

const updateUser = async () => {
	try {
		const res = await axios.put(`${endpoints.BASE_URL}${endpoints.USER_URL}`);
	} catch (e) {
		console.error('Client Error:', e);
	}
};

const updateUserAvatar = async () => {
	try {
		const res = await axios.patch(`${endpoints.BASE_URL}${endpoints.USER_URL}`);
	} catch (e) {
		console.error('Client Error:', e);
	}
};

const deleteUser = async () => {
	try {
		const res = await axios.delete(`${endpoints.BASE_URL}${endpoints.USER_URL}`);
	} catch (e) {
		console.error('Client Error:', e);
	}
};

export { findUser, updateUser, updateUserAvatar, deleteUser };
