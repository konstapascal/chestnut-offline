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
	const [loadedUsers, setLoadedUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [search, setSearch] = useState('');
	const [showConfimModal, setShowConfirmModal] = useState(false);

	const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

	const confirmDeleteHandler = () => {
		setShowConfirmModal(false);
	};

	useEffect(() => {
		const fetchUsers = async () => {
			await Axios.get('http://localhost:8080/api/users/', {
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
			<h1>List of users</h1>
			<h3>Search user:</h3>
			<Input icon='search' onChange={(e) => setSearch(e.target.value)} />
			<Segment>
				<List as='ul' divided>
					{loadedUsers &&
						filteredUsers.map((item) => (
							<List.Item key={item.ID} id={item.ID}>
								<Item.Content>
									<Modal
										trigger={
											<Button
												onClick={showDeleteWarningHandler}
												floated='right'
												size='small'
												negative
											>
												Delete account
											</Button>
										}
										open={showConfimModal}
										onClose={cancelDeleteHandler}
										closeIcon
									>
										<Header
											icon='warning sign'
											content='Do you want to delete your account?'
										/>
										<Modal.Content>
											<p>
												There is no way to recover your account after you delete
												it. All your data including your key pairs will be
												deleted.
												<br /> <b>Are you sure?</b>
											</p>
										</Modal.Content>
										<Modal.Actions>
											<Button color='red' onClick={cancelDeleteHandler}>
												<Icon name='remove' /> No
											</Button>
											<Button color='green' onClick={confirmDeleteHandler}>
												<Icon name='checkmark' /> Yes
											</Button>
										</Modal.Actions>
									</Modal>
									<List.Header as='a'>{item.Username}</List.Header>
									<List.Description as='a'>id: {item.ID}</List.Description>
									<List.Description as='a'>{item.Email}</List.Description>
								</Item.Content>
							</List.Item>
						))}
				</List>
			</Segment>
		</div>
	);
};

export default AdminPage;
