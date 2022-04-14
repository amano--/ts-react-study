import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface SharedGreeterProps {}

const StyledSharedGreeter = styled.div`
  color: pink;
`;

export function SharedGreeter(props: SharedGreeterProps) {
  return (
    <StyledSharedGreeter>
      <h1>Welcome to SharedGreeter!</h1>
    </StyledSharedGreeter>
  );
}

export default SharedGreeter;
