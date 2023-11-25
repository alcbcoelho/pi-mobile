import axios from 'axios';
import endpoints from '../helpers/endpoints';

const createItem = async () => {
	try {
		const res = await axios.post(`${endpoints.BASE_URL}${endpoints.ITEMS_URL}`, {});
	} catch (e) {
		console.error('Client Error:', e);
	}
};

const findItem = async () => {
	try {
		const res = await axios.get(`${endpoints.BASE_URL}${endpoints.ITEMS_URL}`);
	} catch (e) {
		console.error('Client Error:', e);
	}
};

const updateItem = async () => {
	try {
		const res = await axios.put(`${endpoints.BASE_URL}${endpoints.ITEMS_URL}`);
	} catch (e) {
		console.error('Client Error:', e);
	}
};

const updateItemPhotos = async () => {
	try {
		const res = await axios.patch(`${endpoints.BASE_URL}${endpoints.ITEMS_URL}`);
	} catch (e) {
		console.error('Client Error:', e);
	}
};

const deleteItem = async () => {
	try {
		const res = await axios.delete(`${endpoints.BASE_URL}${endpoints.ITEMS_URL}`);
	} catch (e) {
		console.error('Client Error:', e);
	}
};

export { createItem, findItem, updateItem, updateItemPhotos, deleteItem };
