import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { List, Item, Segment, Input } from 'semantic-ui-react';
import { AuthContext } from '../context/auth-context';

const AdminPage = () => {
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const [loadedUser, setLoadedUsers] = useState([]);
	const [search, setSearch] = useState('');
	const [filteredUsers, setFilteredUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			setIsLoading(true);
			const response = await Axios.get('http://localhost:8080/api/users/', {
				headers: {
					Authorization: auth.token,
				},
			})
				.then((response) => {
					setLoadedUsers(response.data.users);
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err.response.data);
				});
		};
		fetchUsers();
	}, [Axios.get]);

	useEffect(() => {
		!isLoading &&
			loadedUser &&
			setFilteredUsers(
				loadedUser.filter((user) =>
					user.Username.toLowerCase().includes(search.toLowerCase())
				)
			);
	}, [search, loadedUser]);

	return (
		<Segment style={{ margin: '2.5rem' }}>
			<List as='ul' divided>
				<List.Item id='UsersHeader'>
					<h1>List of users</h1>
					<h3>Search user:</h3>
					<div>
						<Input icon='search' onChange={(e) => setSearch(e.target.value)} />
					</div>
				</List.Item>
				{!isLoading &&
					loadedUser &&
					filteredUsers.map((item) => (
						<List.Item id={item.ID}>
							<Item.Content>
								<List.Header as='a'>{item.Username}</List.Header>
								<List.Description as='a'>id: {item.ID}</List.Description>
								<List.Description as='a'>{item.Email}</List.Description>
							</Item.Content>
						</List.Item>
					))}
			</List>
		</Segment>
	);
};

export default AdminPage;
