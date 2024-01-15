import { useState } from 'react';
import Button from './Button';

// eslint-disable-next-line no-extend-native
String.prototype.capitalizeFirstLetter = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

export default function FormAddFriend({ onAddFriend }) {
	const [nameInput, setNameInput] = useState('');
	const [imageInput, setImageInput] = useState('https://i.pravatar.cc/48');

	function handleSubmit(e) {
		e.preventDefault();

		//GUARD CLAUSE
		if (!nameInput || !imageInput) return;

		const id = crypto.randomUUID();
		const newFriend = {
			id: id,
			name: nameInput.capitalizeFirstLetter(),
			image: `${imageInput}?=${id}`,
			balance: 0,
		};

		onAddFriend(newFriend);

		//RESET THE INPUT FIELDS
		setNameInput('');
		setImageInput('https://i.pravatar.cc/48');
	}

	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label>🧑‍🤝‍🧑 Friend Name</label>
			<input type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)}></input>

			<label>🖼️ Image URL</label>
			<input type="text" value={imageInput} onChange={(e) => setImageInput(e.target.value)}></input>

			<Button>Add</Button>
		</form>
	);
}
