import { useState } from 'react';
import Button from './Button';

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
	const [bill, setBill] = useState('');
	const [paidByUser, setPaidByUser] = useState('');
	const paidByFriend = bill !== '' && paidByUser !== '' ? bill - paidByUser : '';
	const [whoIsPaying, setWhoIsPaying] = useState('user');

	function handleSubmit(e) {
		e.preventDefault();

		//GUARD CLAUSE
		if (!bill || !paidByUser) return;

		onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
	}

	return (
		<form className="form-split-bill" onSubmit={handleSubmit}>
			<h2>Split a bill with {selectedFriend.name}</h2>

			<label>💰 Bill Value</label>
			<input
				type="text"
				value={bill}
				onChange={(e) => {
					if (paidByUser !== '' && +e.target.value <= paidByUser) {
						setBill(+e.target.value);
						setPaidByUser('');
					}
					if (e.target.value === '') {
						setBill('');
						setPaidByUser('');
					}
					if (+e.target.value > paidByUser) {
						setBill(+e.target.value);
					}
				}}
			/>

			<label>🕴️ Your expense</label>
			<input
				type="text"
				value={paidByUser}
				onChange={(e) => {
					if (e.target.value === '') {
						setPaidByUser('');
					}
					if (bill !== '' && e.target.value !== '' && +e.target.value === 0) {
						setPaidByUser(0);
					}
					if (bill !== '' && +e.target.value > 0 && +e.target.value <= bill) {
						setPaidByUser(+e.target.value);
					}
				}}
			/>

			<label>🧑‍🤝‍🧑 {selectedFriend.name}'s expense</label>
			<input type="text" disabled value={paidByFriend} />

			<label>💳 Who is paying the bill</label>
			<select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
				<option value="user">You</option>
				<option value="friend">{selectedFriend.name}</option>
			</select>

			<Button>Split Bill</Button>
		</form>
	);
}
