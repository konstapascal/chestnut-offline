import React from 'react';
import { Tab } from 'semantic-ui-react';
import AesEncryption from '../AesEncryption';
import AesDecryption from '../AesDecryption';
import Rot13 from '../Rot13';

const SymmetricSubpage = () => {
	const SymmetricOptions = [
		{
			menuItem: 'AES Encryption',
			render: () => (
				<Tab.Pane>
					<AesEncryption />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'AES Decryption',
			render: () => (
				<Tab.Pane>
					<AesDecryption />
				</Tab.Pane>
			),
		},
		{
			menuItem: 'ROT13',
			render: () => (
				<Tab.Pane>
					<Rot13 />
				</Tab.Pane>
			),
		},
	];

	return <Tab panes={SymmetricOptions} />;
};

export default SymmetricSubpage;
