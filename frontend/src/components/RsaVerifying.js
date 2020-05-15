import React, { useContext } from 'react';

import VerifyingTooltip from './Tooltips/VerifyingTooltip';

import { SelectedKeyContext } from '../context/selected-key-context';

const RsaVerifying = () => {
	const { selectedKey } = useContext(SelectedKeyContext);

	return (
		<div style={{ margin: '1.5rem' }}>
			<VerifyingTooltip />
			<p>
				Selected key: <b>{selectedKey.Name ? selectedKey.Name : 'None'}</b>
			</p>
			<h3>NOT DONE!</h3>
		</div>
	);
};

export default RsaVerifying;
