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

	const isIdAnOperator = (id) => {
		if (id === '+' || id === '-' || id === 'x' || id === '/' || id === ',') {
			return true;
		} else {
			return false;
		}
	};
	const isIdAnOperatorWithoutComma = (id) => {
		if (id === '+' || id === '-' || id === 'x' || id === '/') {
			return true;
		} else {
			return false;
		}
	};

	const handleClick = (id) => {
		switch (id) {
			case '=':
				if (!number) {
					return;
				} else if (isIdAnOperator(number.charAt(number.length - 1))) {
					const newNumber = number.replaceAt(number.length - 1, ' ');
					setEquation(newNumber);
					const result = eval(newNumber);
					setNumber(result.toString());
				} else if (number.indexOf('x') > 0) {
					const index = number.indexOf('x');
					const newNumber = number.replaceAt(index, '*');
					setEquation(number + id);
					const result = eval(newNumber);
					setNumber(result.toString());
				} else {
					setEquation(number + id);
					const result = eval(number);
					setNumber(result.toString());
				}
				break;
			case 'C':
				setNumber('');
				setEquation('');
				break;
			case '.':
				if (!number.length) {
					return;
				}
				if (isIdAnOperator(number.charAt(number.length - 1))) {
					return;
				}
				if (number.indexOf('.') > 0) {
					if (
						number.lastIndexOf('x') > number.lastIndexOf('.') ||
						number.lastIndexOf('+') > number.lastIndexOf('.') ||
						number.lastIndexOf('-') > number.lastIndexOf('.') ||
						number.lastIndexOf('/') > number.lastIndexOf('.')
					) {
						updateValue(id);
					} else {
						return;
					}
				} else {
					updateValue(id);
				}
				break;
			case '+':
				if (isIdAnOperator(number.charAt(number.length - 1))) {
					return;
				} else {
					updateValue(id);
				}
				break;

			case '-':
				if (isIdAnOperator(number.charAt(number.length - 1))) {
					return;
				} else {
					updateValue(id);
				}
				break;

			case '/':
				if (isIdAnOperator(number.charAt(number.length - 1))) {
					return;
				} else {
					updateValue(id);
				}
				break;

			case 'x':
				if (isIdAnOperator(number.charAt(number.length - 1))) {
					return;
				} else {
					updateValue(id);
				}
				break;

			default:
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
