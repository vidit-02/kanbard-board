import React,{useState} from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import { saveStateToLocalStorage, getStateFromLocalStorage } from './localStorageUtil';


export default function ControlPanel({groupingOption,setGroupingOption,sortingOption,setSortingOption}){
//  console.log({groupingOption,sortingOption});
  const [displayOptions, setDisplayOptions] = useState(false);

  const toggleDisplayOptions = () => {
    setDisplayOptions(!displayOptions);
  };

  const handleGroupingChange = (e) => {
    saveStateToLocalStorage('groupingOption', e.target.value); // Save the selected grouping option to local storage
    setGroupingOption(e.target.value);

  };

  const handleSortingChange = (e) => {
    setSortingOption(e.target.value);
    saveStateToLocalStorage('sortingOption', e.target.value);
  };
  return (
    <div className="container">
       <div className="controlPanel">
         <button className="display-button" onClick={toggleDisplayOptions}>
           <div className="button-text">Display</div>
           <RiArrowDropDownLine style={{ fontSize: '30px' }} />
         </button>
         {displayOptions && (
           <div className="options-block">
            <div  className="display-option" >
             <label className="labels" htmlFor="grouping">Grouping:</label>
             <select  className="options" id="grouping" value={groupingOption} onChange={handleGroupingChange}>
               <option value="status">Status</option>
               <option value="user">User</option>
               <option value="priority">Priority</option>
             </select>
            </div>
            <div className="display-option" >
             <label htmlFor="sorting">Ordering:</label>
             <select className="options" id="sorting" value={sortingOption} onChange={handleSortingChange}>
               <option value="" disabled>select</option>
               <option value="priority">Priority</option>
               <option value="title">Title</option>
             </select>
            </div>
           </div>
         )}
       </div>
       {/* Rest of your component */}
     </div>
  )
}
