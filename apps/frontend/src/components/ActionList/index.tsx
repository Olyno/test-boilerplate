import { normalizeEnum } from '../../helpers';
import { getActionTypeById } from '../../services/actionTypes';
import {
  ActionID,
  ActionListContainer,
  ActionListItem,
  ActionListTitle,
  ActionType,
} from './styled';

export default function ActionList({ actions }: { actions: any[] }) {
  return (
    <ActionListContainer>
      <ActionListTitle>Action Queue</ActionListTitle>
      {actions.map((action) => {
        const actionType = getActionTypeById(action.type_id);
        const normalizedActionType = normalizeEnum(actionType.type);
        return (
          <ActionListItem key={action.id}>
            <ActionID>{`ID: ${action.id}`}</ActionID>
            <ActionType>{normalizedActionType}</ActionType>
          </ActionListItem>
        );
      })}
    </ActionListContainer>
  );
}
