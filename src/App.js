import { useState } from 'react';
import Button from './components/Button';
import FormAddFriend from './components/FormAddFriend';
import FormSplitBill from './components/FormSplitBill';
import FriendsList from './components/FriendsList';

const initialFriendsList = [
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
];

export default function App() {
	const [friendsList, setFriendsList] = useState(initialFriendsList);
	function handleShowAddFriendModal() {
		setShowAddFriendModal((value) => !value);
	}

	const [showAddFriendModal, setShowAddFriendModal] = useState(false);
	function handleAddFriendList(friend) {
		if (friendsList.map((friend) => friend.name).includes(friend.name)) {
			window.alert('Please input another user name. Its already reserved');
		} else {
			//Update the friend list
			setFriendsList((currentFriends) => [...currentFriends, friend]);
			//Hide the modal
			setShowAddFriendModal(false);
		}
	}

	const [selectedFriend, setSelectedFriend] = useState(null);
	function handleSelectFriend(friend) {
		// Selection with no de-select toggle
		// setSelectedFriend(friend);
		// Selection with toggle logic
		setSelectedFriend((currentSelected) => (currentSelected?.id === friend.id ? null : friend));
	}

	function handleSplitBill(value) {
		// console.log(value);
		setFriendsList((friends) =>
			friends.map((friend) =>
				friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + value } : friend,
			),
		);

		//CLOSE THE SPLIT PAY MODAL BY RESETTING THE SELECTED USER VALUE
		setSelectedFriend(null);
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friends={friendsList}
					selectedFriend={selectedFriend}
					onSelectFriend={handleSelectFriend}
				/>

				{showAddFriendModal && <FormAddFriend onAddFriend={handleAddFriendList} />}

				<Button onClick={handleShowAddFriendModal}>
					{!showAddFriendModal ? 'Add Friend' : 'Close'}
				</Button>
			</div>

			{selectedFriend && (
				<FormSplitBill
					selectedFriend={selectedFriend}
					onSplitBill={handleSplitBill}
					key={selectedFriend.id}
				/>
			)}
		</div>
	);
}
