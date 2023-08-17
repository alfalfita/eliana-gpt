import styled from '@emotion/styled';
import { Button } from '@aws-amplify/ui-react';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 45px;
  width: 100%;
`;

export const Left = styled.div``;
export const Right = styled.div``;

export const StyledButton = styled(Button)`
  border-radius: 40px;
  border: 2px solid #fff;
  color: #fff;
  font-size: 16px;
  padding: 5px 15px;
`;
