import { useState } from 'react';

import Button from './components/Button';
import FormSplitBill from './components/FormSplitBill';
import FormAddFriend from './components/FormAddFriend';
import FriendsList from './components/FriendsList';

export default function App() {
	const [friendsList, setFriendsList] = useState([
		{
			id: 118836,
			name: 'Clark',
			image: 'https://i.pravatar.cc/48?u=118836',
			balance: -7,
		},
		{
			id: 933372,
			name: 'Sarah',
			image: 'https://i.pravatar.cc/48?u=933372',
			balance: 20,
		},
		{
			id: 499476,
			name: 'Anthony',
			image: 'https://i.pravatar.cc/48?u=499476',
			balance: 0,
		},
	]);
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState(null);

	function showAddFriendHandler() {
		setShowAddFriend((showAddFriend) => !showAddFriend);
		setSelectedFriend(null);
	}
	function addFriendHandler(newFriend) {
		setFriendsList((friendsList) => [...friendsList, newFriend]);
		// Hide the form after submission
		setShowAddFriend(false);
	}
	function handleFriendSelectionToggle(friend) {
		setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
		setShowAddFriend(false);
	}
	function handleSplitBill(value) {
		setFriendsList((friendsList) =>
			friendsList.map((friend) =>
				friend.id === selectedFriend.id
					? {
							...friend,
							balance: friend.balance + value,
					  }
					: friend
			)
		);

		// Close the split bill pane after submission
		setSelectedFriend(null);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friends={friendsList}
					selectedFriend={selectedFriend}
					onFriendSelect={handleFriendSelectionToggle}
				/>
				{showAddFriend && <FormAddFriend onAddFriend={addFriendHandler} />}
				<Button onClick={showAddFriendHandler}>
					{!showAddFriend ? 'Add friend' : 'Close'}
				</Button>
			</div>
			{selectedFriend && (
				<FormSplitBill
					key={selectedFriend.id}
					friend={selectedFriend}
					onSplitBill={handleSplitBill}
				/>
			)}
		</div>
	);
}
