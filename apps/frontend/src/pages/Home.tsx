import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ActionCard from '../components/ActionCard';
import Navbar from '../components/Navbar';
import { getActionTypes } from '../services/actionTypes';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

export default function HomePage() {
  const [actionTypes, setActionTypes] = useState([]);

  useEffect(() => {
    fetchActionTypes();
  }, []);

  const fetchActionTypes = async () => {
    try {
      const types = await getActionTypes();
      setActionTypes(types);
    } catch (error) {
      console.error('Error fetching action types:', error);
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container>
        {actionTypes.map((actionType, i) => (
          <ActionCard actionType={actionType} key={i} />
        ))}
      </Container>
    </React.Fragment>
  );
}
