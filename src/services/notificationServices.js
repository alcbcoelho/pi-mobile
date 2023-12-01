import axios from 'axios';
import endpoints from '../config/endpoints';
import { api } from '../config/axiosConfig';

const triggerMatchSearch = async () => {
	try {
		const res = await api.post(endpoints.MATCHES_URL);
		if (res?.data) return res?.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error(e.response?.data);
		} else {
			console.error('Notification Services:', e);
		}
	}
};

const findUserMatches = async () => {
	try {
		const res = await api.get(endpoints.MATCHES_URL);
		if (res?.data) return res?.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error(e.response?.data);
		} else {
			console.error('Notification Services:', e);
		}
	}
};

const findMatchById = async (id) => {
	try {
		const res = await api.get(`${endpoints.MATCHES_ID_URL}${id}`);
		if (res?.data) return res?.data;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.error(e.response?.data);
		} else {
			console.error('Notification Services:', e);
		}
	}
};

export { triggerMatchSearch, findUserMatches, findMatchById };
