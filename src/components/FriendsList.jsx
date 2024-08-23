import Friend from './Friend';

export default function FriendsList({
	friends,
	onFriendSelect,
	selectedFriend,
}) {
	return (
		<ul>
			{friends.map((friend) => (
				<Friend
					key={friend.id}
					friend={friend}
					selectedFriend={selectedFriend}
					onFriendSelect={onFriendSelect}
				/>
			))}
		</ul>
	);
}
