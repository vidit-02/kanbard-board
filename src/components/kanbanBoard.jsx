import React from 'react';
import Card from './card';
import { BsExclamationCircleFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TbAntennaBars3,TbAntennaBars2,TbAntennaBars1,TbAntennaBars4,TbProgressBolt,TbProgressAlert, TbProgressHelp, TbProgressCheck, TbProgressX } from "react-icons/tb";


export default function KanbanBoard({tickets,users,groupingOption,sortingOption}){

  let renderColumns;
  let sortedTickets;
  const sortTickets = (tickets, sortingOption) => {
  if (sortingOption === 'priority') {
    // Sort by priority in descending order
    return tickets.sort((a, b) => b.priority - a.priority);
  } else if (sortingOption === 'title') {
    // Sort by title alphabetically
    return tickets.sort((a, b) => a.title.localeCompare(b.title));
  }
  // Default return tickets as is (no sorting)
  return tickets;
};

  if (groupingOption === 'status') {
    // Extracting unique statuses from tickets
    const statuses = [...new Set(tickets.map((ticket) => ticket.status))];


    sortedTickets=sortTickets(tickets,sortingOption);

    //Function to filter tickets by status
    const filterTicketsByStatus = (status) => {
      return sortedTickets.filter((ticket) => ticket.status === status);
    };

    // Rendering columns dynamically based on statuses
    renderColumns = () => {
      return statuses.map((status) => (
        <div key={status} className="column">
        <div className="column-head">
          <div className="col-logo">

            {status==="In progress" && <TbProgressBolt style={{ fontSize: '20px' }}/>}
            {status==="Todo" && <TbProgressAlert style={{ fontSize: '20px' }}/>}
            {status==="Backlog" && <TbProgressHelp style={{ fontSize: '20px' }}/>}
            {status==="Done" && <TbProgressCheck style={{ fontSize: '20px' }} />}
            {status==="Cancelled" && <TbProgressX style={{ fontSize: '20px' }}/>}

            <div className="col-title">{status}</div>
          </div>
          <div className="col-logo">
            <FaPlus />
            <BiDotsHorizontalRounded />
          </div>
        </div>
          {/* Render cards for this column */}
          {filterTicketsByStatus(status).map((ticket) => (
          <Card key={ticket.id} userId={ticket.userId} users={users} id={ticket.id} title={ticket.title}  status={ticket.status} />
          ))}
        </div>
      ));
    };
  } else if (groupingOption === 'user') {

      sortedTickets=sortTickets(tickets,sortingOption);

    // Function to filter tickets by userId
    const filterTicketsByUserId = (userId) => {
      return sortedTickets.filter((ticket) => ticket.userId === userId);
    };

    renderColumns = () => {
    return users.map((user) => (
      <div key={user.id} className="column">
      <div className="column-head">
      <div className="col-logo">
        <FaUserCircle style={{ fontSize: '20px' }} />
        <div className="col-title">{user.name}</div>
      </div>
      <div className="col-logo">
        <FaPlus />
        <BiDotsHorizontalRounded />
      </div>

      </div>
        {/* Render cards for this column */}
        {filterTicketsByUserId(user.id).map((ticket) => (
          <Card key={ticket.id} userId={ticket.userId} users={users} id={ticket.id} title={ticket.title} status={ticket.status} />
        ))}
      </div>
    ));
  };
} else if (groupingOption === 'priority') {

  // Extracting unique priorities from tickets
   const priorities = [...new Set(tickets.map((ticket) => ticket.priority))];
   const prioTitle={4:"Urgent", 3:"High",2:"Medium", 1:"Low", 0:"No Priority"}

    sortedTickets=sortTickets(tickets,sortingOption);

    // Function to filter tickets by priority
    const filterTicketsByPriority = (priority) => {
      return sortedTickets.filter((ticket) => ticket.priority === priority);
    };

    renderColumns = () => {
    return priorities.map((priority) => (
      <div key={priority} className="column">
      <div className="column-head">
      <div className="col-logo">
        {priority === 0 && <TbAntennaBars1 style={{ fontSize: '20px' }}/>}
        {priority === 1 && <TbAntennaBars2 style={{ fontSize: '20px' }}/>}
        {priority === 2 && <TbAntennaBars3 style={{ fontSize: '20px' }}/>}
        {priority === 3 && <TbAntennaBars4 style={{ fontSize: '20px' }}/>}
        {priority === 4 && <BsExclamationCircleFill style={{ fontSize: '20px' }}/>}
        <div className="col-title">{prioTitle[priority]}</div>
      </div>
      <div className="col-logo">
        <FaPlus />
        <BiDotsHorizontalRounded />
      </div>
      </div>

        {/* Render cards for this column */}
        {filterTicketsByPriority(priority).map((ticket) => (
          <Card key={ticket.id} userId={ticket.userId} users={users} id={ticket.id} title={ticket.title}  status={ticket.status}/>
        ))}
      </div>
    ));
  };
  }
  return (
    <div  className="kanbanBoard">
    {renderColumns()}
    </div>
  )
}
