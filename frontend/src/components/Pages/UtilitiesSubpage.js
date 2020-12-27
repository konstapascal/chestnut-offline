import React from 'react';
import { Tab } from 'semantic-ui-react';
import Base64Encoding from '../Base64Encoding';
import Base64Decoding from '../Base64Decoding';
import UUIDGenerator from '../UUIDGenerator';
import Checksum from '../Checksum';

const UtilitiesSubpage = () => {
	const UtilitiesOptions = [
		{
			menuItem: 'Base64 Encoding',
			render: () => (
				<Tab.Pane>
					<Base64Encoding />
				</Tab.Pane>
			)
		},
		{
			menuItem: 'Base64 Decoding',
			render: () => (
				<Tab.Pane>
					<Base64Decoding />
				</Tab.Pane>
			)
		},
		{
			menuItem: 'UUID Generator',
			render: () => (
				<Tab.Pane>
					<UUIDGenerator />
				</Tab.Pane>
			)
		},
		{
			menuItem: 'Checksum',
			render: () => (
				<Tab.Pane>
					<Checksum />
				</Tab.Pane>
			)
		}
	];

	return <Tab panes={UtilitiesOptions} />;
};

export default UtilitiesSubpage;
