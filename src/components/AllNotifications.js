import NotificationList from '../components/NotificationList';

export default function AllNotifications({ navigation }) {
	return <NotificationList navigation={navigation} allNotifications={true} />;
}
