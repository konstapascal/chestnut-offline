import React, { useState, useContext } from 'react';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';
import Axios from 'axios';

import { AuthContext } from '../../context/auth-context';

const AccountSettingsPage = () => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const auth = useContext(AuthContext);
	const deleteUrl = 'http://localhost:8080/api/users/me';
	const authHeader = {
		headers: {
			Authorization: auth.token,
		},
	};

	const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

	const confirmDeleteHandler = () => {
		setShowConfirmModal(false);

		try {
			Axios.delete(deleteUrl, authHeader).then((response) => {
				if (response.data != null) {
					auth.logout();
				}
			});
		} catch {
			console.log('Something went wrong! Could not delete user');
		}
	};

	return (
		<div style={{ margin: '2.5rem' }}>
			<h1>Settings page</h1>
			<Modal
				trigger={
					<Button negative onClick={showDeleteWarningHandler}>
						Delete account
					</Button>
				}
				open={showConfirmModal}
				onClose={cancelDeleteHandler}
				closeIcon
			>
				<Header
					icon='warning sign'
					content='Are you sure you want to delete your account?'
				/>
				<Modal.Content>
					<p>
						There is no way to recover your account after deletion. All your
						keypairs will also be deleted in this process.
						<br />
						<br />
						<b>Are you sure?</b>
					</p>
				</Modal.Content>
				<Modal.Actions>
					<Button color='red' onClick={cancelDeleteHandler}>
						<Icon name='remove' />
						No
					</Button>
					<Button color='green' onClick={confirmDeleteHandler}>
						<Icon name='checkmark' />
						Yes
					</Button>
				</Modal.Actions>
			</Modal>
		</div>
	);
};

export default AccountSettingsPage;
