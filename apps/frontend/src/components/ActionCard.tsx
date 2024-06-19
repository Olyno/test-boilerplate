import { ActionType } from '@test-boilerplate/shared-types';
import { PropsWithRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import eventManager from '../eventManager';
import { normalizeEnum } from '../helpers';
import { addAction } from '../services/actions';

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  width: 300px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #6200ee;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  padding: 10px 20px;
`;

const Credit = styled.p`
  font-size: 14px;
  color: #666;
`;

export default function ActionCard(
  props: PropsWithRef<{ actionType: ActionType }>
) {
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
    const handleEvent = (
      eventType: string,
      action: Record<string, unknown>
    ) => {
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
