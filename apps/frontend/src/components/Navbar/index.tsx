import { useEffect, useState } from 'react';
import eventManager from '../../eventManager';
import { getActions } from '../../services/actions';
import { Action } from '../../types';
import ActionList from '../ActionList';
import {
  NavbarContainer,
  NotificationBell,
  NotificationContainer,
  NotificationCount,
} from './styled';

export default function Navbar() {
  const [eventCount, setEventCount] = useState(0);
  const [actions, setActions] = useState<Action[]>([]);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const initializeActions = async () => {
      try {
        const result = await getActions();
        setActions(result);
        setEventCount(result.length);
      } catch (error) {
        console.error('Error initializing actions:', error);
      }
    };

    initializeActions();

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
