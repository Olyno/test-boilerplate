import styled from 'styled-components';

export type BannerType = 'error' | 'info' | 'success';

export const StyledBanner = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  color: white;
  background-color: ${({ type }: { type: BannerType }) => {
    switch (type) {
      case 'error':
        return 'red';
      case 'info':
        return 'blue';
      case 'success':
        return 'green';
      default:
        return 'gray';
    }
  }};
`;
