import React from 'react';
import { BasicTooltip } from './TooltipSchemas';
import { Icon } from 'semantic-ui-react';

const KeysWarningTooltip = () => {
	return (
		<BasicTooltip
			content={
				<div
					style={{
						textAlign: 'center',
						padding: '.25rem'
					}}>
					<p>
						Imported keys are stored in <b>localStorage</b> and will not
						persist across devices.
					</p>
				</div>
			}>
			<i style={{ marginLeft: '.4rem' }}>
				<Icon
					name='warning'
					style={{
						color: '#14872f'
					}}
				/>
			</i>
		</BasicTooltip>
	);
};

export default KeysWarningTooltip;
