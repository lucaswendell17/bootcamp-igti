import React, { useState, useEffect } from 'react';
import Spinner from './components/Spinner';
import Header from './components/Header';
import Candidates from './components/Candidates';

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [previousVotes, setPreviousVotes] = useState([]);
  const [previousPercentages, setPreviousPercentages] = useState([]);

  useEffect(() => {
    setInterval(() => {
      fetch('http://localhost:8080/votes')
        .then((res) => res.json())
        .then((json) => {
          const previousVotes = candidates.map(({ id, votes }) => {
            return { id, votes };
          });
          const previousPercentages = candidates.map(({ id, percentage }) => {
            return { id, percentage };
          });

          setCandidates(json.candidates);
          setPreviousVotes(previousVotes);
          setPreviousPercentages(previousPercentages);
        });
    }, 1000);
  }, []);

  if (candidates.length === 0) {
    return <Spinner description="Carregando..." />;
  }
  return (
    <div className="container">
      <Header>Votação</Header>
      <Candidates
        previousPercentages={previousPercentages}
        previousVotes={previousVotes}
        candidates={candidates}
      />
    </div>
  );
}
