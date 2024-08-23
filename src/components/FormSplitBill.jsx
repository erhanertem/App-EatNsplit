import { useState } from 'react';
import Button from './Button';

export default function FormSplitBill({ friend, onSplitBill }) {
	const [bill, setBill] = useState('');
	const [paidByUser, setPaidByUser] = useState('');
	const [whoPays, setWhoPays] = useState('user');

	// Derived State
	const paidByFriend = bill && paidByUser ? bill - paidByUser : '';

	function handleSubmit(e) {
		e.preventDefault();

		// GUARD CLAUSE - Check if the user has entered a valid input
		if (!bill || !paidByUser) {
			alert('Please enter valid values for the bill and your expense.');
			return;
		}

		// Calculate the value to be paid by the friend based on who pays the bill
		const value = whoPays === 'friend' ? -paidByUser : paidByFriend;

		onSplitBill(value);
	}

	return (
		<form
			className="form-split-bill"
			onSubmit={handleSubmit}
		>
			<h2>Split a bill with {friend.name}</h2>

			<label>💰 Bill value</label>
			<input
				type="text"
				value={bill}
				onChange={(e) => {
					const currBillValue = e.target.value;

					// If bill value field is lower than your expense field, allow the new input but reset the your expense field
					if (paidByUser && currBillValue <= paidByUser) {
						setBill(+currBillValue);
						setPaidByUser('');
					}
					// If bill value field is greater than your expense field, allow the new input
					if (currBillValue > paidByUser) {
						setBill(+currBillValue);
					}
					// If deleted the bill amount, reset your expense and bill value fields
					if (currBillValue === '') {
						setBill('');
						setPaidByUser('');
					}
				}}
			/>

			<label>💵 Your expense</label>
			<input
				type="text"
				value={paidByUser}
				onChange={(e) => {
					const currExpenseValue = e.target.value;
					// If deleted your expense field, reset your expense state
					if (currExpenseValue === '') {
						setPaidByUser('');
					}
					// If bill value and your expense fields are filled,
					if (bill && +currExpenseValue > 0 && +currExpenseValue <= bill) {
						setPaidByUser(+currExpenseValue);
					}
				}}
			/>

			<label>🙍‍♂️ {friend.name}'s expense</label>
			<input
				type="text"
				value={paidByFriend}
				disabled
			/>

			<label>💳 Who is paying the bill</label>
			<select
				value={whoPays}
				onChange={(e) => setWhoPays(e.target.value)}
			>
				<option value="user">You</option>
				<option value="friend">{friend.name}</option>
			</select>

			<Button>Split bill</Button>
		</form>
	);
}
