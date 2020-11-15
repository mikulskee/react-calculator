import React, { useEffect, useState, useCallback } from 'react';
import { ButtonNumberWrapper } from './ButtonNumber.Styles';
import { evaluate } from 'mathjs';
const ButtonNumber = (props) => {
	const {
		children,
		size,
		id,
		color,
		updateValue,
		setNumber,
		number,
		upperEquation,
		setUpperEquation,
		mainEquation,
		setMainEquation,
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
		if (id === '+' || id === '-' || id === '*' || id === '/' || id === '.') {
			return true;
		} else {
			return false;
		}
	};

	const replaceValueInArray = (array, index, value) => {
		const ret = array.slice(0);
		ret[index] = value;
		return ret;
	};

	const removeElementFromArray = (array, elem) => {
		const index = array.lastIndexOf(elem);
		if (index > -1) {
			array.splice(index, 1);
		}
	};

	const isIdAnOperatorWithoutComma = (id) => {
		if (id === '+' || id === '-' || id === '*' || id === '/') {
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
				} else if (isIdAnOperator(number.charAt(number.length - 2))) {
					return;
				} else {
					setUpperEquation(number + id);
					const result = evaluate(number);
					setNumber(result.toString());
					setMainEquation([result.toString()]);
				}

				break;
			case 'C':
				setNumber('');
				setUpperEquation('');
				setMainEquation([]);
				break;
			case '.':
				if (!number.length) {
					return;
				} else if (number.indexOf(id) > -1) {
					if (mainEquation.length > 1) {
						if (isIdAnOperator(mainEquation[mainEquation.length - 2])) {
							if (
								mainEquation[mainEquation.length - 1].indexOf(id) > -1 ||
								mainEquation[mainEquation.length - 1] === ''
							) {
								return;
							} else {
								updateValue(id);
							}
						}
					} else {
						return;
					}
				} else {
					updateValue(id);
				}

				break;

			case '+/-':
				let newMainEquation;
				if (!number) {
					setNumber('-');
					setMainEquation(['-']);
				}

				if (mainEquation.length > 0) {
					if (mainEquation[mainEquation.length - 2] === '+') {
						const newMainEquation = replaceValueInArray(mainEquation, mainEquation.length - 2, '-');
						setMainEquation(newMainEquation);
						setNumber(newMainEquation.join(' '));
					} else if (mainEquation[mainEquation.length - 2] === '-') {
						if (
							mainEquation[mainEquation.length - 3] === '*' ||
							mainEquation[mainEquation.length - 3] === '/'
						) {
							const newMainEquation = [...mainEquation];
							removeElementFromArray(newMainEquation, '-');
							setMainEquation(newMainEquation);
							setNumber(newMainEquation.join(' '));
						} else {
							const newMainEquation = replaceValueInArray(
								mainEquation,
								mainEquation.length - 2,
								'+'
							);
							setMainEquation(newMainEquation);
							setNumber(newMainEquation.join(' '));
						}
					} else if (
						mainEquation[mainEquation.length - 2] === '*' ||
						mainEquation[mainEquation.length - 2] === '/'
					) {
						if (mainEquation[mainEquation.length - 1] === '') {
							if (mainEquation[mainEquation.length - 4] === '-') {
								if (mainEquation.length - 4 === 0) {
									const newMainEquation = mainEquation.slice(1, mainEquation.length);
									setMainEquation(newMainEquation);
									setNumber(newMainEquation.join(' '));
								} else {
									const newMainEquation = replaceValueInArray(
										mainEquation,
										mainEquation.length - 4,
										'+'
									);
									setMainEquation(newMainEquation);
									setNumber(newMainEquation.join(' '));
								}
							} else if (mainEquation[mainEquation.length - 4] === undefined) {
								const newMainEquation = [...mainEquation];
								newMainEquation.unshift('-');
								setMainEquation(newMainEquation);
								setNumber(newMainEquation.join(' '));
							}
						} else {
							if (
								mainEquation[mainEquation.length - 2] === '*' ||
								mainEquation[mainEquation.length - 2] === '/'
							) {
								const lastEl = mainEquation[mainEquation.length - 1];
								const newMainEquation = replaceValueInArray(
									mainEquation,
									mainEquation.length - 1,
									'-'
								);
								newMainEquation.push(lastEl);
								setMainEquation(newMainEquation);
								setNumber(newMainEquation.join(' '));
							}
						}
					}
				}

				break;

			default:
				if (isIdAnOperator(id)) {
					if (!mainEquation.length) {
						if (number.length) {
							updateValue(id);
						} else {
							return;
						}
					} else if (mainEquation[mainEquation.length - 1] === '') {
						const newMainEquation = replaceValueInArray(mainEquation, mainEquation.length - 2, id);
						setMainEquation(newMainEquation);
						setNumber(newMainEquation.join(' '));
					} else {
						updateValue(id);
					}
				} else {
					updateValue(id);
				}
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
