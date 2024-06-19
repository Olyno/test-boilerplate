import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #282c34;
  color: white;
`;

export const NotificationContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

export const NotificationBell = styled.div`
  position: relative;
  font-size: 24px;
`;

export const NotificationCount = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
`;
