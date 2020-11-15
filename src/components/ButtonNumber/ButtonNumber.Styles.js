import styled from 'styled-components';

export const ButtonNumberWrapper = styled.button`
	position: relative;
	cursor: pointer;
	border: none;
	box-shadow: none;
	width: ${({ size }) => (size === 'big' ? '50%' : '25%')};
	height: ${({ buttonWidth }) => `${buttonWidth}px`};
	background: linear-gradient(110deg, rgba(255, 255, 255, 1) 0%, rgba(244, 244, 244, 1) 100%);
	color: ${({ color }) => (color === 'primary' ? 'black' : 'white')};
	background: ${({ id }) => id === '/' && '#9156e2'};
	background: ${({ id }) => id === '*' && '#8d52de'};
	background: ${({ id }) => id === '-' && '#894eda'};
	background: ${({ id }) => id === '+' && '#8547d6'};
	background: ${({ id }) => id === '=' && '#e62f89'};

	&:hover::after {
		opacity: 1;
	}

	&::after {
		content: '';
		position: absolute;
		opacity: 0;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.2);
		transition: opacity 0.15s linear;
	}
`;
