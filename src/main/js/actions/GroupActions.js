import dispatcher from "../dispatcher";

export function getGroup(id){
	const group = { 
		groupName: "El groupo", 
		description: "Es un muy bueno groupo!",
		coverPhoto: 'https://s3-us-west-1.amazonaws.com/patreon-reward-images/1300113.jpeg',
		members: [2222,4444,6666,8888],
		activityList: [
			{
				id: 12,
				userId: 4444,
				username: "jacksonmeister",
				content: "said: Hey guys! Who wants to play my little pony??",
				imageUrl: "https://images.igdb.com/igdb/image/upload/t_micro/scutr4p9gytl4txb2soy.jpg",
				timestamp: "25 Oct 2017 16:46:54 GMT"
			},
			{
				id: 7,
				userId: 6666,
				username: "weetermachine",
				content: "said: Hi!",
				imageUrl: "http://images.igdb.com/igdb/image/upload/t_micro/l3n0zuklmgkloi1udslt.png",
				timestamp: "25 Oct 2017 01:49:14 GMT"
			}
		]
	}
	dispatcher.dispatch({
		type: "GET_GROUP_DATA",
		group: group
	});
	/*$.get( "/api/users/" + id, function( data ){
		dispatcher.dispatch({
			type: "GET_USER_DATA",
			user: data
		});
	});*/
}

export function updateSettings(settings){
	console.log("these are the group settings:");
	console.log(settings);
}

