import { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';

export default function useUser() {
	return useContext(UserContext);
}
