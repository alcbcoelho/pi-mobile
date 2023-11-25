// Components
import UnreadNotifications from '../components/UnreadNotifications';
import AllNotifications from '../components/AllNotifications';
import TabBar from '../components/TabBar';

// Data
import { unreadNotifications } from '../mockup/NotificationsData';

export default function NotificationsRoutes() {
	return (
		<TabBar
			screens={[
				{ component: UnreadNotifications, title: 'Não Lidas' },
				{ component: AllNotifications, title: 'Todas' },
			]}
			hasBadge={[unreadNotifications.length]}
		/>
	);
}
