import React, { useState, useContext } from 'react';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';
import Axios from 'axios';

import { AuthContext } from '../../context/auth-context';

const AccountSettingsPage = () => {
	const auth = useContext(AuthContext);
	const deleteUrl = 'http://localhost:8080/api/users/me';
	const authHeader = {
		headers: {
			Authorization: auth.token,
		},
	};

	const [ModalOpen, setModalOpen] = useState(false);

	const handleModalStatus = () => setModalOpen(!ModalOpen);

	const deleteUser = () => {
		Axios.delete(deleteUrl, authHeader)
			.then(() => {
				auth.logout();
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	};

	return (
		<div style={{ margin: '3rem' }}>
			<h1>Account settings</h1>
			<p>
				Delete your account permanently, erasing all personal info and
				associated data such as your keys from the database.
			</p>
			<Modal
				trigger={
					<Button negative onClick={handleModalStatus}>
						Delete account
					</Button>
				}
				open={ModalOpen === true}
			>
				<Header color='red' icon='warning sign' content='Delete account?' />
				<Modal.Content>
					<p>
						This is a <b>permanent</b> action and will delete both your account
						and your keys.
					</p>
					<p>
						Are you sure you want to <b>delete</b> your account?
					</p>
				</Modal.Content>
				<Modal.Actions>
					<Button color='red' onClick={handleModalStatus}>
						<Icon name='remove' />
						No
					</Button>
					<Button color='green' onClick={deleteUser}>
						<Icon name='checkmark' />
						Yes
					</Button>
				</Modal.Actions>
			</Modal>
		</div>
	);
};

export default AccountSettingsPage;
