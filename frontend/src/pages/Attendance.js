import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/student/list')
      .then(res => {
        setStudents(res.data.students);
        const defaultStatus = {};
        res.data.students.forEach(s => defaultStatus[s._id] = 'Present');
        setStatus(defaultStatus);
      });
  }, []);

  const handleStatusChange = (id, val) => {
    setStatus({ ...status, [id]: val });
  };

  const submitAttendance = async () => {
    const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
    const attendanceData = students.map(s => ({
      studentId: s._id,
      date: today,
      status: status[s._id]
    }));

    await axios.post('http://localhost:5000/attendance/mark', { attendance: attendanceData });
    alert('Attendance saved!');
  };

  const styles = {
    container: {
      marginLeft: '270px',
      padding: '30px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    th: {
      backgroundColor: '#10b981',
      color: '#fff',
      padding: '12px',
      textAlign: 'left',
    },
    td: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    select: {
      padding: '6px 10px',
      fontSize: '14px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#2563eb',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    heading: {
      marginBottom: '20px',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Mark Attendance</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td style={styles.td}>{s.name}</td>
              <td style={styles.td}>
                <select
                  value={status[s._id]}
                  onChange={e => handleStatusChange(s._id, e.target.value)}
                  style={styles.select}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={styles.button} onClick={submitAttendance}>Submit Attendance</button>
    </div>
  );
};

export default Attendance;
