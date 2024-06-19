import styled from 'styled-components';

export const ActionListContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #f9f9f9;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 320px;
  max-height: 400px;
  overflow-y: auto;
`;

export const ActionListTitle = styled.h4`
  margin-bottom: 15px;
  font-size: 18px;
  color: #444;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
`;

export const ActionListItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ActionID = styled.span`
  font-weight: bold;
  color: #555;
`;

export const ActionType = styled.span`
  font-size: 14px;
  color: #888;
`;
