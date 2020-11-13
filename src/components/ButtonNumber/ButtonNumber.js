import React, { useEffect, useState, useCallback } from 'react';
import { ButtonNumberWrapper } from './ButtonNumber.Styles';

const ButtonNumber = (props) => {
	const {
		children,
		size,
		id,
		color,
		updateValue,
		setNumber,
		number,
		equation,
		setEquation,
	} = props;
	const [buttonWidth, setButtonWidth] = useState();

	const getButtonWidth = useCallback(() => {
		setButtonWidth(document.getElementById(1).getBoundingClientRect().width);
	}, []);

	useEffect(() => {
		getButtonWidth();
	}, [getButtonWidth]);
	useEffect(() => {
		window.addEventListener('resize', getButtonWidth);

		return () => {
			window.removeEventListener('resize', getButtonWidth);
		};
	}, [getButtonWidth]);

	String.prototype.replaceAt = function (index, replacement) {
		return this.substr(0, index) + replacement + this.substr(index + replacement.length);
	};

	const handleClick = (id) => {
		if (id === '=') {
			console.log(number);

			if (number.indexOf('x') > 0) {
				const index = number.indexOf('x');
				const newNumber = number.replaceAt(index, '*');
				setEquation(number + id);
				const result = eval(newNumber);
				setNumber(result);
			} else {
				setEquation(number + id);
				const result = eval(number);
				setNumber(result);
			}
		} else if (id === 'C') {
			setNumber('');
			setEquation('');
		} else {
			updateValue(id);
		}
	};
	return (
		<ButtonNumberWrapper
			size={size}
			id={id}
			buttonWidth={buttonWidth}
			color={color}
			onClick={() => handleClick(id)}
		>
			{children}
		</ButtonNumberWrapper>
	);
};

export default ButtonNumber;
