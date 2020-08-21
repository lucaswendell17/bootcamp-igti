import React, { useState, useEffect } from 'react';
import Users from './components/users/Users';
import Toggle from './components/toggle/Toggle';

export default function App() {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    fetch('https://randomuser.me/api/?seed=rush&nat=br&results=10')
      .then((data) => data.json())
      .then((json) => setUsers(json.results));
    // const json = await res.json();
    // setUsers(res.results);
  }, []);

  const handleShowUsers = (isChecked) => {
    setShowUsers(isChecked);
  };

  return (
    <div>
      <h3>React LifeCycle</h3>
      <Toggle
        description="Mostrar usuários: "
        enabled={showUsers}
        onToggle={handleShowUsers}
      />
      <hr />
      {showUsers && <Users users={users} />}
    </div>
  );
}
