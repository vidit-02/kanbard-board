import React from "react";
import { TbProgressBolt,TbProgressAlert, TbProgressHelp, TbProgressCheck, TbProgressX } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";

export default function Card({id,userId,users,title,status}){
   const filteredUser = users.find((user) => user.id === userId);
  return(

    <div className="card">
  <div className="row">
    <div className="card-number">{id}</div>
    <div className="profile-pic-container">
  { filteredUser.available === true &&  <div className="online-indicator-active"></div>}
  { filteredUser.available === false && <div className="online-indicator-inactive"></div>}
    <FaUserCircle style={{ fontSize: '20px', paddingTop: '5px' }} />
  </div>
  </div>
  <div className="row-mid">
  {status==="In progress" && <TbProgressBolt style={{ fontSize: '20px' }} />}
  {status==="Todo" && <TbProgressAlert style={{ fontSize: '20px' }} />}
  {status==="Backlog" && <TbProgressHelp style={{ fontSize: '20px' }}/>}
  {status==="Done" && <TbProgressCheck style={{ fontSize: '20px' }} />}
  {status==="Cancelled" && <TbProgressX style={{ fontSize: '20px' }} />}

    <div className="card-title">{title}</div>
  </div>
  <div className="row">
    <div className="outline-box">
    <div className="feature-request"> </div>
    <div className="card-number">Feature Request</div>
    </div>
  </div>
    </div>
  )
}
