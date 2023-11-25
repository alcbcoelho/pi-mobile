import { View, FlatList, Image } from 'react-native';
import { Text, Badge } from 'react-native-paper';
import NotificationList from '../components/NotificationList';

// Data
import NotificationsData from '../mockup/NotificationsData';

// Styles
import { global } from '../styles/global';

export default function AllNotifications({ navigation }) {
	return <NotificationList navigation={navigation} allNotifications={true} />;
}
