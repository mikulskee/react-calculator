import React, { useEffect, useState, useCallback } from 'react';
import { ButtonNumberWrapper } from './ButtonNumber.Styles';

const ButtonNumber = (props) => {
	const { children, size, id } = props;
	const [buttonWidth, setButtonWidth] = useState();

	const getButtonWidth = useCallback(() => {
		setButtonWidth(document.getElementById(1).getBoundingClientRect().width);
	}, []);

	useEffect(() => {
		getButtonWidth();
	}, []);
	useEffect(() => {
		window.addEventListener('resize', getButtonWidth);

		return () => {
			window.removeEventListener('resize', getButtonWidth);
		};
	}, [getButtonWidth]);

	return (
		<ButtonNumberWrapper size={size} id={id} buttonWidth={buttonWidth}>
			{children}
		</ButtonNumberWrapper>
	);
};

export default ButtonNumber;
