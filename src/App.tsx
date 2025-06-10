import React, { useEffect, useState } from 'react';

import './App.css';
import httpService from './service/http.service';


function App() {
  const TrafficLight = () =>{
    const [currentLight, setCurrentLight] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        switch (currentLight) {
          case 'red':
            setCurrentLight('green');
            break;
          case 'green':
            setCurrentLight('yellow');
            break;
          case 'yellow':
            setCurrentLight('red');
            break;
          default:
            setCurrentLight('red');
        }
      }, currentLight === 'red' ? 4000 : currentLight === 'yellow' ? 500 : 3000);

      return () => clearInterval(interval);
    }, [currentLight]);

    return (
      <div className="traffic-light-container">
      <div className="traffic-light">
        <div className={`light red ${currentLight === 'red' ? 'on' : ''}`} />
        <div className={`light yellow ${currentLight === 'yellow' ? 'on' : ''}`} />
        <div className={`light green ${currentLight === 'green' ? 'on' : ''}`} />
      </div>
      </div>
    );
  }
  type User = {
  id: number;
  name: string;
  email: string;
};

  const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    httpService.get("/users")
      .then(setUsers)
      .catch((err) => console.error("Failed to fetch users", err));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
};
 
  return (

    // Build a traffic light where the lights switch from green to yellow to red after predetermined intervals and loop indefinitely. Each light should be lit for the following durations:
// Red light: 4000ms
// Yellow light: 500ms
// Green light: 3000ms
// You are free to exercise your creativity to style the appearance of the traffic light.
<>
    <div className="App">
      <h2>Traffic Light Simulation</h2>
      <TrafficLight />
    </div>
    </>
  );
}

export default App;
