import axios from 'axios';
import endpoints from '../helpers/endpoints';

const findAndSaveMatches = async () => {
	try {
		const res = await axios.post(`${endpoints.BASE_URL}${endpoints.MATCH_URL}`);
	} catch (e) {
		console.error('Client Error:', e);
	}
};

const findUserMatches = async () => {
	try {
		const res = await axios.get(`${endpoints.BASE_URL}${endpoints.MATCH_URL}`);
	} catch (e) {
		console.error('Client Error:', e);
	}
};

export { findAndSaveMatches, findUserMatches };
