import React, { useState, useEffect } from 'react';
import ButtonNumber from '../../components/ButtonNumber/ButtonNumber';
import { ButtonsWrapper, Wrapper } from './Calculator.Styles';
import { buttonContentData } from './Calculator.Data';
import CalculatorScreen from '../../components/CalculatorScreen/CalculatorScreen';

const Calculator = () => {
	const [number, setNumber] = useState('');
	const [mainEquation, setMainEquation] = useState([]);
	const [upperEquation, setUpperEquation] = useState('');

	const updateValue = (value) => {
		if (value === '+' || value === '-' || value === '/' || value === 'x') {
			setNumber((prevState) => prevState + ` ${value} `);
		} else {
			setNumber((prevState) => prevState + value);
		}
	};

	useEffect(() => {
		if (
			number.indexOf('+') > 0 ||
			number.indexOf('-') > 0 ||
			number.indexOf('x') > 0 ||
			number.indexOf('/') > 0
		) {
			const array = number.split(' ');

			setMainEquation(array);
		}
	}, [number]);

	return (
		<Wrapper>
			<CalculatorScreen number={number} upperEquation={upperEquation} />
			<ButtonsWrapper>
				{buttonContentData.map((item) => {
					return (
						<ButtonNumber
							key={item.id}
							size={item.size}
							id={item.content}
							color={item.color}
							updateValue={updateValue}
							number={number}
							setNumber={setNumber}
							setUpperEquation={setUpperEquation}
							upperEquation={upperEquation}
							mainEquation={mainEquation}
							setMainEquation={setMainEquation}
						>
							{item.content}
						</ButtonNumber>
					);
				})}
			</ButtonsWrapper>
		</Wrapper>
	);
};

export default Calculator;
