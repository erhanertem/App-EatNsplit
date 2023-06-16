import { useEffect, useState } from 'react'

const initialFriends = [
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
]

function Button({ children, onClick }) {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	)
}

export default function App() {
	const [friends, setFriends] = useState(initialFriends)
	const [showAddFriend, setShowAddFriend] = useState(false)
	const [selectedFriend, setSelectedFriend] = useState(null)

	function handleSplitBill(value) {
		console.log(value)

		setFriends(friends =>
			friends.map(friend =>
				friend.id === selectedFriend.id
					? { ...friend, balance: friend.balance + value }
					: friend,
			),
		)

		setSelectedFriend(null)
	}

	function handleShowAddFriend() {
		setShowAddFriend(show => !show)
	}

	function handleAddFriend(friend) {
		setFriends(friends => [...friends, friend])
		setShowAddFriend(false)
	}

	function handleSelect(friend) {
		// setSelectedFriend(friend)
		setSelectedFriend(currentSelected =>
			currentSelected?.id === friend.id ? null : friend,
		)
		setShowAddFriend(false)
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendsList
					friends={friends}
					onSelection={handleSelect}
					selectedFriend={selectedFriend}
				/>

				{showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

				<Button onClick={handleShowAddFriend}>
					{showAddFriend ? 'Close' : 'Add Friend'}
				</Button>
			</div>
			{selectedFriend && (
				<FormSplitBill
					selectedFriend={selectedFriend}
					onSplitBill={handleSplitBill}
				/>
			)}
		</div>
	)
}

function FriendsList({ friends, onSelection, selectedFriend }) {
	return (
		<ul>
			{friends.map(friend => (
				<Friend
					onSelection={onSelection}
					selectedFriend={selectedFriend}
					friend={friend}
					key={friend.id}
				/>
			))}
		</ul>
	)
}

function Friend({ friend, onSelection, selectedFriend }) {
	const isSelected = selectedFriend?.id === friend.id

	return (
		<li className={isSelected ? 'selected' : ''}>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name}</h3>

			{friend.balance < 0 && (
				<p className="red">
					You owe {friend.name} ${Math.abs(friend.balance)}
				</p>
			)}
			{friend.balance > 0 && (
				<p className="green">
					{friend.name} owes you ${Math.abs(friend.balance)}
				</p>
			)}
			{friend.balance === 0 && <p>You and {friend.name} are even</p>}

			<Button onClick={() => onSelection(friend)}>
				{isSelected ? 'Close' : 'Select'}
			</Button>
		</li>
	)
}

function FormAddFriend({ onAddFriend }) {
	const [name, setName] = useState('')
	const [image, setImage] = useState('https://i.pravatar.cc/48')

	function handleSubmit(e) {
		e.preventDefault()
		const id = crypto.randomUUID()

		// Guard Clause
		if (!name || !image) return

		const newFriend = { name, image: `${image}?=${id}`, balance: 0, id }
		onAddFriend(newFriend)

		//Clear submission values
		setName('')
		setImage('https://i.pravatar.cc/48')
	}

	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label>🧑‍🤝‍🧑Friend Name</label>
			<input
				type="text"
				value={name}
				onChange={e => setName(e.target.value)}
			></input>

			<label>🖼️ Image URL</label>
			<input
				type="text"
				value={image}
				onChange={e => setImage(e.target.value)}
			></input>

			<Button>Add</Button>
		</form>
	)
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
	const [bill, setBill] = useState('') // VERY IMPORTANT!!! We are using empty strings as they are input elements
	const [paidByUser, setPaidByUser] = useState('')
	const [whoIsPaying, setWhoIsPaying] = useState('user')
	// Derived State
	const paidByFriend = bill ? bill - paidByUser : ''

	function handleSubmit(e) {
		e.preventDefault()

		if (!bill || !paidByUser) return

		onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
	}

	useEffect(() => {
		setPaidByUser(0)
	}, [bill])

	return (
		<form className="form-split-bill" onSubmit={handleSubmit}>
			<h2>Split a bill with {selectedFriend.name}</h2>

			<label>💰 Bill value</label>
			<input
				type="text"
				value={bill}
				onChange={e => setBill(+e.target.value)}
			></input>

			<label>💳 Your expense</label>
			<input
				type="text"
				value={paidByUser}
				onChange={e =>
					setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)
				}
			></input>

			<label>💳 {selectedFriend.name}'s expense</label>
			<input type="text" value={paidByFriend} disabled></input>

			<label>🤑 Who is paying the bill</label>
			<select
				value={whoIsPaying}
				onChange={e => setWhoIsPaying(e.target.value)}
			>
				<option value="user">You</option>
				<option value="friend">{selectedFriend.name}</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	)
}
