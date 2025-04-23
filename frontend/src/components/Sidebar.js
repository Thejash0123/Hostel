import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => (
  <div className="sidebar">
    <h3>Admin Panel</h3>
    <ul>
      <li><Link to="/add-student">Add Student</Link></li>
      <li><Link to="/view-students">View Students</Link></li>
      <li><Link to="/attendance">Attendance</Link></li>
      <li><Link to="/leave-requests">Leave Requests</Link></li>
    </ul>
  </div>
);

export default Sidebar;
