import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import {
	List,
	Item,
	Grid,
	Input,
	Button,
	Message,
	Icon,
} from 'semantic-ui-react';
import { AuthContext } from '../../context/auth-context';

const UsersPage = () => {
	const auth = useContext(AuthContext);
	const [loadedUsers, setLoadedUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [loadedPublicKeys, setLoadedPublicKeys] = useState([]);
	const [search, setSearch] = useState('');

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

	useEffect(() => {
		fetchUsers();
	}, []);

	useEffect(() => {
		const storageKeys = JSON.parse(localStorage.getItem('addedPublicKeys'));

		if (storageKeys == null) {
			// Make new local storage field if there isn't one
			return localStorage.setItem('addedPublicKeys', JSON.stringify([]));
		} else {
			// If there is local storage data, add it to state
			setLoadedPublicKeys(storageKeys);
		}
	}, []);

	useEffect(() => {
		setFilteredUsers(
			loadedUsers.filter((user) =>
				user.Username.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [search]);

	// Add key to state and local storage
	const addPublicKey = (keyOwner, keyID, keyName, keyLength, publicKey) => {
		const updatedState = [
			...loadedPublicKeys,
			{
				keyOwner: keyOwner,
				ID: keyID,
				keyName: keyName,
				keyLength: keyLength,
				publicKey: publicKey,
			},
		];

		localStorage.setItem('addedPublicKeys', JSON.stringify(updatedState));
		setLoadedPublicKeys(updatedState);
	};

	// Function to check if key exists in the state array, returns true or false
	const isKeyAdded = (publicKey) => {
		return loadedPublicKeys.some((key) => key.publicKey === publicKey);
	};

	return (
		<div style={{ margin: '2.5rem' }}>
			<h1>List of users</h1>
			<p>
				This is a list of all registered users and their public keys. You may
				filter users and easily add their public keys to your keys list.
			</p>
			<Grid stackable columns={1}>
				<Grid.Column style={{ width: '40vw', minWidth: '400px' }}>
					<Input
						placeholder='Filter users'
						icon='search'
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Grid.Row style={{ marginTop: '1.5rem' }}>
						<List
							divided
							relaxed
							style={{
								border: '1px solid #e3e3e3',
								borderRadius: '0.5rem',
								padding: '1rem',
							}}
						>
							{filteredUsers.length === 0 && (
								<Message>
									<Icon name='user' size='large' />
									No user results for {search}.
								</Message>
							)}
							{loadedUsers &&
								filteredUsers.map((user) => (
									<List.Item key={user.ID}>
										<List.Header as='h4'>{user.Username}</List.Header>
										{user.Keypairs.map((key) => (
											<List.List key={key.KeypairID} divided>
												<List.Item>
													<Button
														onClick={() =>
															addPublicKey(
																user.Username,
																key.KeypairID,
																key.Name,
																key.Length,
																key.PublicKey
															)
														}
														disabled={isKeyAdded(key.PublicKey)}
														content={
															isKeyAdded(key.PublicKey) ? 'Added' : 'Add'
														}
														icon={
															isKeyAdded(key.PublicKey) ? 'checkmark' : 'add'
														}
														color='green'
														size='small'
														compact
														floated='right'
													/>
													<List.Icon
														name='key'
														size='large'
														verticalAlign='middle'
													/>
													<Item.Content>
														<List.Header>{key.Name}</List.Header>
														<List.Description>
															Length: {key.Length}
														</List.Description>
													</Item.Content>
												</List.Item>
											</List.List>
										))}
									</List.Item>
								))}
						</List>
					</Grid.Row>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default UsersPage;
