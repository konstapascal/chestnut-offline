import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { List, Item, Segment } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';

const UsersList = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [state, setState] = useState({
		search: '',
	});
	const [loadedUser, setLoadedUsers] = useState({ users: [] });
	let search = '';

	useEffect(() => {
		const fetchUsers = async () => {
			setIsLoading(true);
			const response = await Axios.get('http://localhost:5000/api/users/');

			setLoadedUsers(response.data);
			setIsLoading(false);
		};

		fetchUsers();
	}, []);

	const handleChange = (event) => {
		setState({ search: event.target.value });
		search = event.target.value;
		console.log(event.target.value);
	};

	const filteredUsers = loadedUser.users.filter((user) => {
		return user.userName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
	});

	return (
		<React.Fragment>
			{console.log(filteredUsers)}
			<Segment style={{ width: 600 }}>
				<List as='ul' divided relaxed>
					<List.Item>
						<h1>List of users</h1>
						<div>
							<Input icon='search' onChange={handleChange} />
						</div>
					</List.Item>
					{filteredUsers.map((item) => (
						<List.Item>
							<Item.Content>
								<List.Header as='a'>{item.userName}</List.Header>
								<List.Description as='a'>{item.email}</List.Description>
							</Item.Content>
						</List.Item>
					))}
				</List>
			</Segment>
		</React.Fragment>
	);
};

export default UsersList;
