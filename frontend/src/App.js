import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AddStudent from './pages/AddStudent';
import ViewStudents from './pages/ViewStudents';
import Attendance from './pages/Attendance';
import LeaveRequests from './pages/LeaveRequests';
import ApplyLeave from './pages/ApplyLeave';

const App = () => (
  <Router>
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '200px', padding: '20px', flex: 1 }}>
        <Routes>
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/view-students" element={<ViewStudents />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave-requests" element={<LeaveRequests />} />
          <Route path="/apply-leave" element={<ApplyLeave />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
