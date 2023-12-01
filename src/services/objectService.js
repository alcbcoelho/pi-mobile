import axios from 'axios';
import endpoints from '../config/endpoints';
import { api } from '../config/axiosConfig';

const createItem = async (data) => {
	try {
		const res = await api.post(endpoints.ITEMS_URL, JSON.stringify(data));
		if (res?.data) return res.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error(e.response?.data);
		} else {
			console.error('Object Services:', e);
		}
	}
};

const findUserItems = async () => {
	try {
		const res = await api.get(endpoints.ITEMS_URL);
		if (res?.data) return res.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error(e.response?.data);
		} else {
			console.error('Object Services:', e);
		}
	}
};

const findItemById = async (id) => {
	try {
		const res = await api.get(`${endpoints.ITEMS_ID_URL}${id}`);
		if (res?.data) return res.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error(e.response?.data);
		} else {
			console.error('Object Services:', e);
		}
	}
};

const updateItem = async (id, data) => {
	try {
		const res = await api.put(`${endpoints.ITEMS_ID_URL}${id}`, JSON.stringify(data));
		if (res?.data) return res.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error(e.response?.data);
		} else {
			console.error('Object Services:', e);
		}
	}
};

const uploadItemPhotos = async (id, data) => {
	try {
		const res = await api.patchForm(`${endpoints.ITEMS_UPLOAD_ID_URL}${id}`, JSON.stringify(data));
		if (res?.data) return res.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error(e.response?.data);
		} else {
			console.error('Object Services:', e);
		}
	}
};

const removeItem = async (id) => {
	try {
		const res = await api.delete(`${endpoints.ITEMS_ID_URL}${id}`);
		if (res?.status) return res.status;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error(e.response?.data);
		} else {
			console.error('Object Services:', e);
		}
	}
};

export { createItem, findUserItems, findItemById, updateItem, uploadItemPhotos, removeItem };
