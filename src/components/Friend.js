import Button from './Button';

// eslint-disable-next-line no-extend-native
String.prototype.capitalizeFirstLetter = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

export default function Friend({ friend, selectedFriend, onSelectFriend }) {
	//Controls only Button text toggle
	const isSelected = selectedFriend?.id === friend.id;

	return (
		<li className={isSelected ? 'selected' : ''}>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name.capitalizeFirstLetter()}</h3>

			{friend.balance < 0 && (
				<p className="red">
					You owe {friend.name.capitalizeFirstLetter()} {Math.abs(friend.balance)}€
				</p>
			)}
			{friend.balance > 0 && (
				<p className="green">
					{friend.name.capitalizeFirstLetter()} owes you {Math.abs(friend.balance)}€
				</p>
			)}
			{friend.balance === 0 && <p>You and {friend.name.capitalizeFirstLetter()} are even</p>}

			<Button onClick={() => onSelectFriend(friend)}>{isSelected ? 'Close' : 'Select'}</Button>
		</li>
	);
}
