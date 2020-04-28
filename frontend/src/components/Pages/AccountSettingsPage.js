import React, { useState, useContext } from 'react';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';
import Axios from 'axios';

import { AuthContext } from '../../context/auth-context';

const AccountSettingsPage = () => {
	const auth = useContext(AuthContext);
	const [showConfimModal, setShowConfirmModal] = useState(false);

	const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
		console.log('opend');
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
		console.log('closed');
	};

	const confirmDeleteHandler = () => {
		setShowConfirmModal(false);
		try {
			Axios.delete('http://localhost:8080/api/users/' + auth.id).then(
				(response) => {
					if (response.data != null) {
						alert('User deleted');
						//Also should logout user/ delete localStorage
					}
				}
			);
			//   const deleteUser = async () => {
			//     const response = await Axios.delete(
			//       `http://localhost:8080/api/users/${auth.id}`,
			//       {
			//         headers: {
			//           Authorization: auth.token,
			//         },
			//       }
			//     )
			//       .then((response) => {
			//         console.log("deleted user");
			//       })
			//       .catch((err) => {
			//         console.log(err.response);
			//       });
			//   };
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
				open={showConfimModal}
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
						data including your keypairs will also be deleted.
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
		</div>
	);
};

export default AccountSettingsPage;
