const unreadNotifications = [
	{
		id: '1',
		type: 'match',
		title: 'Correspondência em potencial'/* 'Encontramos uma possível correspondência para seu objeto!' */,
		objectId: 'id do objeto',
		foundObject: 'Headset',
		lostObject: 'Headset',
		user: 'Astolfo Coêlho',
		imgUrl: 'https://i.zst.com.br/thumbs/45/1e/15/1297885181.jpg',
	},
]

const allNotifications = [
	...unreadNotifications, {
			id: '2',
			type: 'match',
			title: 'Correspondência em potencial',
			objectId: 'id do objeto',
			foundObject: 'Garrafa',
			lostObject: 'Garrafa',
			user: 'Astolfo Coêlho',
			imgUrl: 'https://images.tcdn.com.br/img/img_prod/689875/garrafa_termica_b_kind_rouge_passion_83_1_2adb6215687d695b4d90a02259aac4ae.jpg',
	}
]

export { unreadNotifications, allNotifications };

// const NotificationsList = {
// 	unreadNotifications: [
// 		{
// 			id: '1',
// 			type: 'match',
// 			title: 'Encontramos uma possível correspondência para seu objeto!',
// 			objectId: 'id do objeto',
// 			object: 'Headset',
// 			objectinfo: 'Loren ipsum',
// 			imgUrl: 'https://i.zst.com.br/thumbs/45/1e/15/1297885181.jpg',
// 		},
// 	],
// 	allNotifications: [
// 		{
// 			id: '1',
// 			type: 'match',
// 			title: 'Encontramos uma possível correspondência para seu objeto!',
// 			objectId: 'id do objeto',
// 			object: 'Headset',
// 			objectinfo: 'Loren ipsum',
// 			imgUrl: 'https://i.zst.com.br/thumbs/45/1e/15/1297885181.jpg',
// 		},
// 		{
// 			id: '2',
// 			type: 'match',
// 			title: 'Encontramos uma possível correspondência para seu objeto!',
// 			objectId: 'id do objeto',
// 			object: 'Garrafa',
// 			objectinfo: 'Loren ipsum',
// 			imgUrl: 'https://images.tcdn.com.br/img/img_prod/689875/garrafa_termica_b_kind_rouge_passion_83_1_2adb6215687d695b4d90a02259aac4ae.jpg',
// 		},
// 	],
// };

