import axios from 'axios';
import endpoints from '../config/endpoints';
import { api } from '../config/axiosConfig';

const findUser = async () => {
	try {
		const res = await api.get(endpoints.USERS_URL);
		if (res?.data) return res.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error('Axios Error:', e.response?.data);
		} else {
			console.error('User Services:', e);
		}
	}
};

const findUserById = async (id) => {
	try {
		const res = await api.get(`${endpoints.USERS_ID_URL}${id}`);
		if (res?.data) return res.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error('Axios Error:', e.response?.data);
		} else {
			console.error('User Services:', e);
		}
	}
};

const updateUser = async (data) => {
	try {
		const res = await api.put(endpoints.USERS_URL, JSON.stringify(data));
		if (res?.data) return res.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error('Axios Error:', e.response?.data);
		} else {
			console.error('User Services:', e);
		}
	}
};

const uploadUserAvatar = async (formData) => {
	try {
		const res = await api.patch(endpoints.USERS_UPLOAD_URL, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			transformRequest: () => {
				return formData;
			},
		});

		if (res?.data) return res.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error('Axios Error:', e.response?.data);
		} else {
			console.error('User Services:', e);
		}
	}
};

const deleteUser = async () => {
	try {
		const res = await api.delete(endpoints.USERS_URL);
		if (res?.data) return res.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error('Axios Error:', e.response?.data);
		} else {
			console.error('User Services:', e);
		}
	}
};

export { findUser, findUserById, updateUser, uploadUserAvatar, deleteUser };
