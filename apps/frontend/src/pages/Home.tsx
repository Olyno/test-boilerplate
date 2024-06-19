import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ActionCard from '../components/ActionCard';
import Banner from '../components/Banner';
import Navbar from '../components/Navbar';
import { getActionTypes } from '../services/actionTypes';
import { getBackendHealth } from '../services/health';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`;

export default function HomePage() {
  const [isUp, setIsUp] = useState(false);
  const [actionTypes, setActionTypes] = useState([]);

  useEffect(() => {
    fetchActionTypes();
    getBackendHealth()
      .then(() => setIsUp(true))
      .catch(() => setIsUp(false));
  }, []);

  const fetchActionTypes = async () => {
    try {
      const types = await getActionTypes();
      setActionTypes(types);
    } catch (error) {
      console.error('Error fetching action types:', error);
    }
  };

  if (!isUp) return <Banner type="error">Backend is down</Banner>;

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
