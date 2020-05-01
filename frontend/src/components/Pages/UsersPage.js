import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import {
	List,
	Item,
	Grid,
	Input,
	Icon,
	Button,
	Modal,
	Header,
	Message,
	Segment,
} from 'semantic-ui-react';
import { AuthContext } from '../../context/auth-context';

const UsersPage = () => {
	const auth = useContext(AuthContext);
	const [loadedUsers, setLoadedUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const fetchUsers = async () => {
			await Axios.get('http://localhost:8080/api/keys/', {
				headers: {
					Authorization: auth.token,
				},
			})
				.then((response) => {
					setLoadedUsers(response.data.users);
					setFilteredUsers(response.data.users);
				})
				.catch((err) => {
					console.log(err.response.data);
				});
		};
		fetchUsers();
	}, []);

	useEffect(() => {
		loadedUsers &&
			setFilteredUsers(
				loadedUsers.filter((user) =>
					user.Username.toLowerCase().includes(search.toLowerCase())
				)
			);
	}, [search]);

	return (
		<div style={{ margin: '2.5rem' }}>
			<h1>List of users and their public keys</h1>
			<h3>Search user:</h3>
			<Input icon='search' onChange={(e) => setSearch(e.target.value)} />
			<Segment>
				<List as='ul' divided>
					{loadedUsers &&
						filteredUsers.map((user) => (
							<List.Item key={user.ID} id={user.ID}>
								<Item.Content>
									<h4 as='a'>{user.Username}</h4>
									{user.Keypairs.map((key) => (
										<Item.Content style={{ padding: '0.5rem' }}>
											{key === undefined && <Message>Test</Message>}
											<List.Header as='a'>{key.Name}</List.Header>
											<List.Description as='a'>
												{key.PublicKey}
											</List.Description>
											<Button color='green' compact>
												Add
											</Button>
										</Item.Content>
									))}
								</Item.Content>
							</List.Item>
						))}
				</List>
			</Segment>
		</div>
	);
};

export default UsersPage;
