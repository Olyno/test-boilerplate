import { PropsWithRef, useEffect, useState } from 'react';
import eventManager from '../../eventManager';
import { normalizeEnum } from '../../helpers';
import { addAction } from '../../services/actions';
import { Action } from '../../types';
import { Button, Card, Credit } from './styled';

// TODO: Type actionType
export default function ActionCard(props: PropsWithRef<{ actionType: any }>) {
  const actionType = props.actionType;
  const [credits, setCredits] = useState<number>(actionType.credits);

  const addToQueue = async () => {
    const normalizedActionType = normalizeEnum(actionType.type);
    try {
      addAction(actionType.type);
      alert(`Added '${normalizedActionType}' to the queue`);
    } catch (error) {
      console.error('Error adding to queue:', error);
    }
  };

  useEffect(() => {
    const handleEvent = (eventType: string, action: Action) => {
      if (eventType === 'actionExecuted' && action.type_id === actionType.id) {
        setCredits((prevCredits) => prevCredits - 1);
      }
    };

    eventManager.subscribe(handleEvent);

    return () => {
      eventManager.unsubscribe(handleEvent);
    };
  }, []);

  return (
    <Card key={actionType.id}>
      <h3>{normalizeEnum(actionType.type)}</h3>
      <Credit>Credits: {credits}</Credit>
      <Button onClick={() => addToQueue()}>Add to the queue</Button>
    </Card>
  );
}
