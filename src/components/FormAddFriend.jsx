import { useState } from 'react';
import Button from './Button';

export default function FormAddFriend({ onAddFriend }) {
	const [name, setName] = useState('');
	const [image, setImage] = useState('https://i.pravatar.cc/48');

	function handleFormAddFriendSubmit(e) {
		e.preventDefault();

		// GUARD CLAUSE - Non-compliant input
		if (!name || !image) return;

		const id = crypto.randomUUID();
		const adjusted = name
			.trim()
			.toLowerCase()
			.split(' ')
			.map((name) => name.charAt(0).toUpperCase() + name.slice(1))
			.join(' ');
		const newFriend = {
			id,
			name: adjusted,
			image: `${image}?=${id}`,
			balance: 0,
		};
		// Add new friend to the list
		onAddFriend(newFriend);

		// Reset form inputs
		setName('');
		setImage('https://i.pravatar.cc/48');
	}

	return (
		<form
			className="form-add-friend"
			onSubmit={handleFormAddFriendSubmit}
		>
			<label>🧑‍🤝‍🧑Friend name</label>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<label>🖼️Image URL</label>
			<input
				type="text"
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>

			<Button>Add</Button>
		</form>
	);
}
