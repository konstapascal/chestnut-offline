import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { List, Item, Grid, Input, Button, Segment } from 'semantic-ui-react';
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
		<Grid columns={1} style={{ margin: '2.5rem' }}>
			<Grid.Column>
				<Grid.Row>
					<h1>List of users and their public keys</h1>
					<h3>Search user:</h3>
					<Input icon='search' onChange={(e) => setSearch(e.target.value)} />
				</Grid.Row>
				<Grid.Row style={{ marginTop: '1.5rem' }}>
					<Segment>
						<List divided relaxed>
							{loadedUsers &&
								filteredUsers.map((user) => (
									<List.Item key={user.ID} id={user.ID}>
										<List.Icon name='user' />
										<Item.Content>
											<List.Header>{user.Username}</List.Header>
											{user.Keypairs.map((key, index) => (
												<List.Item key={index} style={{ margin: '1rem' }}>
													<Item.Content>
														<List.Header>{key.Name}</List.Header>
														<List.Description>{key.PublicKey}</List.Description>
														<Button
															compact
															color='green'
															size='small'
															content='Add'
														/>
													</Item.Content>
												</List.Item>
											))}
										</Item.Content>
									</List.Item>
								))}
						</List>
					</Segment>
				</Grid.Row>
			</Grid.Column>
		</Grid>
	);
};

export default UsersPage;
