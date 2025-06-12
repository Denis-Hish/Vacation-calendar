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

const SpinnerBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledSpinner = styled.div`
  animation: ${rotate} 2s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 3.125rem;
  height: 3.125rem;
`;

const StyledCircle = styled.circle`
  stroke: var(--primary);
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
`;

function Spinner() {
  return (
    <SpinnerBackdrop>
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
    </SpinnerBackdrop>
  );
}

export default Spinner;
