import './App.css';
import React, { useState, useEffect } from 'react';
import ControlPanel from './components/controlPanel';
import KanbanBoard from './components/kanbanBoard';
import {  getStateFromLocalStorage } from './components/localStorageUtil';


function App() {
  const [tickets, setTickets] = useState([]);
  const [users,setUsers]=useState([]);
  const [groupingOption, setGroupingOption] = useState('priority'); // default grouping option
  const [sortingOption, setSortingOption] = useState(''); // default sorting option

  const fetchData = async () => {
   try {
     const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
     const data = await response.json();
     setTickets(data.tickets);
     setUsers(data.users);
     console.log(data);
   } catch (error) {
     console.error('Error fetching data:', error);
   }
 };

 useEffect(() => {
   // Retrieve saved state from local storage when the component mounts
  const savedGroupingOption = getStateFromLocalStorage('groupingOption');
  const savedSortingOption = getStateFromLocalStorage('sortingOption');

  if (savedGroupingOption) {
    setGroupingOption(savedGroupingOption);
  }

  if (savedSortingOption) {
    setSortingOption(savedSortingOption);
  }
   fetchData(); // Fetch data when the component mounts
 }, []);
  return (
    <div>
    <ControlPanel
      groupingOption={groupingOption}
      setGroupingOption={setGroupingOption}
      sortingOption={sortingOption}
      setSortingOption={setSortingOption}
    />
    <KanbanBoard tickets={tickets} users={users} groupingOption={groupingOption} sortingOption={sortingOption} />
    </div>
  );
}

export default App;
