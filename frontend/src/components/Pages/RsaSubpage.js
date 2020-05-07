import React, { useState, useEffect, useContext } from 'react';
import { Tab } from 'semantic-ui-react';
import RsaEncryption from '../RsaEncyption';
import RsaDecryption from '../RsaDecryption';
import RsaSigning from '../RsaSigning';
import RsaVerifying from '../RsaVerifying';

import { SelectedKeyContext } from '../../context/selected-key-context';

const RsaSubpage = () => {
	const { selectedKey } = useContext(SelectedKeyContext);

	const RsaOptions = [
		{
			menuItem: 'Encryption',
			render: () => (
				<Tab.Pane>
					{!selectedKey.PublicKey ? (
						<div style={{ margin: '2rem' }}>
							<h3>Select a valid keypair.</h3>
							<p>
								You need a <b>public key</b> to encrypt text using the RSA
								algorithm.
							</p>
							<p>Select a valid key from the list on the left.</p>
						</div>
					) : (
						<RsaEncryption />
					)}
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Decryption',
			render: () => (
				<Tab.Pane>
					{!selectedKey.PrivateKey ? (
						<div style={{ margin: '2rem' }}>
							<h3>Select a valid keypair.</h3>
							<p>
								You need a <b>private key</b> to decypt text using the RSA
								algorithm.
							</p>
							<p>Select a valid key from the list on the left.</p>
						</div>
					) : (
						<RsaDecryption />
					)}
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Signing',
			render: () => (
				<Tab.Pane>
					{!selectedKey.PrivateKey ? (
						<div style={{ margin: '2rem' }}>
							<h3>Select a valid keypair.</h3>
							<p>
								You need a <b>private key</b> to sign text using the RSA
								algorithm.
							</p>
							<p>Select a valid key from the list on the left.</p>
						</div>
					) : (
						<RsaSigning />
					)}
				</Tab.Pane>
			),
		},
		{
			menuItem: 'Verifying',
			render: () => (
				<Tab.Pane>
					{!selectedKey.PublicKey ? (
						<div style={{ margin: '2rem' }}>
							<h3>Select a valid keypair.</h3>
							<p>
								You need a <b>public key</b> to verify text using the RSA
								algorithm.
							</p>
							<p>Select a valid key from the list on the left.</p>
						</div>
					) : (
						<RsaVerifying />
					)}
				</Tab.Pane>
			),
		},
	];

	return <Tab panes={RsaOptions} />;
};

export default RsaSubpage;
