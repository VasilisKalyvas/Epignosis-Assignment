import { useState } from 'react';
import './App.css';
import LeftSide from './Components/LeftSide';
import RightSide from './Components/RightSide';
import { AppContext } from './Context/AppContext';


function App() {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})

  return (
    <div className="App">
      <AppContext.Provider 
          value={{ users, setUsers, 
          selectedId, setSelectedId, 
          selectedUser, setSelectedUser }}>
            <LeftSide/>
            <RightSide/>
      </AppContext.Provider>
    </div>
  );
}

export default App;
