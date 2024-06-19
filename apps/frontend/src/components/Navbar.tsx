import { useEffect, useState } from 'react';
import styled from 'styled-components';
import eventManager from '../eventManager';
import { getActions } from '../services/actions';
import { Action } from '../types';
import ActionList from './ActionList';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #282c34;
  color: white;
`;

const NotificationContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const NotificationBell = styled.div`
  position: relative;
  font-size: 24px;
`;

const NotificationCount = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
`;

export default function Navbar() {
  const [eventCount, setEventCount] = useState(0);
  const [actions, setActions] = useState<Action[]>([]);
  const [showActions, setShowActions] = useState(false);

  const initializeActions = async () => {
    try {
      const result = await getActions();
      setActions(result);
      setEventCount(result.length);
    } catch (error) {
      console.error('Error initializing actions:', error);
    }
  };

  const handleEvent = (eventType: string, action: Action) => {
    if (eventType === 'actionAdded') {
      setEventCount((prevCount) => prevCount + 1);
      setActions((prevActions) => [...prevActions, action]);
    } else if (eventType === 'actionExecuted') {
      setEventCount((prevCount) => prevCount - 1);
      setActions((prevActions) =>
        prevActions.filter((a) => a.id !== action.id)
      );
    }
  };

  useEffect(() => {
    initializeActions();
    eventManager.subscribe(handleEvent);

    return () => {
      eventManager.unsubscribe(handleEvent);
    };
  }, []);

  const handleMouseEnter = () => setShowActions(true);
  const handleMouseLeave = () => setShowActions(false);

  return (
    <NavbarContainer>
      <div>My App</div>
      <NotificationContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <NotificationBell>
          <span role="img" aria-label="Notification bell">
            🔔
          </span>
        </NotificationBell>
        {eventCount > 0 && <NotificationCount>{eventCount}</NotificationCount>}
        {showActions && <ActionList actions={actions}></ActionList>}
      </NotificationContainer>
    </NavbarContainer>
  );
}
