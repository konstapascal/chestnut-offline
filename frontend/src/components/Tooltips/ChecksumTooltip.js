import React from 'react';
import { Label } from 'semantic-ui-react';
import { BasicTooltip } from './TooltipSchemas';

const ChecksumTooltip = () => {
	return (
		<BasicTooltip
			content={
				<div
					style={{
						textAlign: 'center',
						padding: '1rem'
					}}>
					<p>
						A <b>checksum</b> is a value used to verify the integrity of a
						file or a data transfer. In other words, it is a sum that
						checks the validity of data.
					</p>

					<p>
						To produce a checksum, you run a program that puts that file
						through an algorithm. Typical algorithms used for this include{' '}
						<b>MD5</b>, <b>SHA-1</b>, <b>SHA-256</b>, and <b>SHA-512</b>.
					</p>
				</div>
			}>
			<span>
				<Label
					basic
					size='large'
					as='a'
					style={{
						marginBottom: '1.5rem',
						color: '#14872f',
						borderColor: '#14872f'
					}}>
					What is Checksum?
				</Label>
			</span>
		</BasicTooltip>
	);
};

export default ChecksumTooltip;
