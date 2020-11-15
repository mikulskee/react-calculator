import React, { useState, useEffect } from 'react';
import ButtonNumber from '../../components/ButtonNumber/ButtonNumber';
import { ButtonsWrapper, Wrapper } from './Calculator.Styles';
import { buttonContentData } from './Calculator.Data';
import CalculatorScreen from '../../components/CalculatorScreen/CalculatorScreen';

const Calculator = () => {
	const [number, setNumber] = useState('');
	const [equation, setEquation] = useState('');

	const updateValue = (value) => {
		setNumber((prevState) => prevState + value);
	};

	return (
		<Wrapper>
			<CalculatorScreen number={number} equation={equation} />
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
							setEquation={setEquation}
							equation={equation}
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
