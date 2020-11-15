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
		if (id === '+' || id === '-' || id === '*' || id === '/' || id === '.' || id === '%') {
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

	const handleClick = (id) => {
		switch (id) {
			case '=':
				if (!number) {
					return;
				} else if (!mainEquation.length) {
					return;
				} else if (isIdAnOperator(number.charAt(number.length - 2))) {
					return;
				} else if (number.indexOf('%')) {
					let newMainEquation = [...mainEquation];
					do {
						const index = newMainEquation.indexOf('%');
						newMainEquation = replaceValueInArray(newMainEquation, index, '*0.01');
					} while (newMainEquation.indexOf('%') > -1);
					setUpperEquation(newMainEquation.join('') + id);
					let result = evaluate(newMainEquation.join(''));
					result = Math.round((result + Number.EPSILON) * 1000000000) / 1000000000;
					setNumber(result.toString());
					setMainEquation([result.toString()]);
				} else {
					setUpperEquation(number + id);
					let result = evaluate(number);
					result = Math.round((result + Number.EPSILON) * 1000000000) / 1000000000;
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
							mainEquation[mainEquation.length - 3] === '/' ||
							mainEquation[mainEquation.length - 3] === '%'
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
						mainEquation[mainEquation.length - 2] === '/' ||
						mainEquation[mainEquation.length - 3] === '%'
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
								mainEquation[mainEquation.length - 2] === '/' ||
								mainEquation[mainEquation.length - 3] === '%'
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
							if (id === '%') {
								updateValue(id);
								updateValue('*');
							} else {
								updateValue(id);
							}
						} else {
							return;
						}
					} else if (mainEquation[mainEquation.length - 1] === '') {
						const newMainEquation = replaceValueInArray(mainEquation, mainEquation.length - 2, id);
						setMainEquation(newMainEquation);
						setNumber(newMainEquation.join(' '));
					} else {
						if (id === '%') {
							updateValue(id);
							updateValue('*');
						} else {
							updateValue(id);
						}
					}
				} else {
					if (id === '0') {
						if (!mainEquation.length) {
							if (!number.length) {
								updateValue(id);
							} else {
								if (number.indexOf('0') !== number.length - 1 || number.indexOf('.') > -1) {
									updateValue(id);
								} else return;
							}
						} else {
							if (
								mainEquation[mainEquation.length - 1].length === 0 ||
								mainEquation[mainEquation.length - 1].indexOf('0') !==
									mainEquation[mainEquation.length - 1].length - 1 ||
								mainEquation[mainEquation.length - 1].indexOf('.') > -1
							) {
								updateValue(id);
							} else return;
						}
					} else {
						updateValue(id);
					}
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
