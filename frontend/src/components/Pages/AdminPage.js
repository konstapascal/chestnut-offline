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
	Segment,
} from 'semantic-ui-react';
import { AuthContext } from '../../context/auth-context';

const AdminPage = () => {
	const auth = useContext(AuthContext);
	const authHeader = {
		headers: {
			Authorization: auth.token,
		},
	};
	const [isLoading, setIsLoading] = useState(false);
	const [loadedUsers, setLoadedUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [search, setSearch] = useState('');

	const getUrl = 'http://localhost:8080/api/users';

	// GET all users
	useEffect(() => {
		const fetchUsers = async () => {
			setIsLoading(true);
			await Axios.get(getUrl, authHeader)
				.then((response) => {
					setLoadedUsers(response.data.users);
					setFilteredUsers(response.data.users);
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err.response.data);
				});
		};
		fetchUsers();
	}, []);

	// DELETE an user
	function deleteUser(UserID) {
		const deleteUrl = 'http://localhost:8080/api/users/' + UserID;

		setIsLoading(true);
		Axios.delete(deleteUrl, authHeader)
			.then(() => {
				return Axios.get(getUrl, authHeader);
			})
			.then((response) => {
				setLoadedUsers(response.data.users);
				setFilteredUsers(response.data.users);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}

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
					<h1>List of users</h1>
					<h3>Search user:</h3>
					<Input icon='search' onChange={(e) => setSearch(e.target.value)} />
				</Grid.Row>
				<Grid.Row style={{ marginTop: '1.5rem' }}>
					<Segment>
						<List divided relaxed>
							{!isLoading &&
								filteredUsers.map((item) => (
									<List.Item key={item.ID} id={item.ID}>
										<List.Icon name='user' verticalAlign='middle' />
										<Item.Content>
											<List.Header>{item.Username}</List.Header>
											<Button
												floated='right'
												compact
												negative
												onClick={() => deleteUser(item.ID)}
											>
												Delete account
											</Button>
											<List.Description>id: {item.ID}</List.Description>
											<List.Description>{item.Email}</List.Description>
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

export default AdminPage;
