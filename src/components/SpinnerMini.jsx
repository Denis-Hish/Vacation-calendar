import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
 0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }`;

const StyledSpinner = styled.div`
  animation: ${rotate} 2s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 2.4rem;
  height: 2.4rem;
`;

const StyledCircle = styled.circle`
  stroke: #dee2e6;
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
`;

function Spinner() {
  return (
    <StyledSpinner>
      <svg className='spinner' viewBox='0 0 50 50'>
        <StyledCircle
          className='path'
          cx='25'
          cy='25'
          r='20'
          fill='none'
          strokeWidth='5'
        ></StyledCircle>
      </svg>
    </StyledSpinner>
  );
}

export default Spinner;
