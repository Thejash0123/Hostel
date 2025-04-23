import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = () => {
    axios.get('http://localhost:5000/leave/all').then(res => setLeaves(res.data));
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const updateLeave = async (id, status) => {
    await axios.post(`http://localhost:5000/leave/update`, { id, status });
    fetchLeaves();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Leave Requests</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Student Name</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Reason</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map(l => (
            <tr key={l._id}>
              <td style={styles.td}>{l.studentName}</td>
              <td style={styles.td}>{new Date(l.date).toLocaleDateString()}</td>
              <td style={styles.td}>{l.reason}</td>
              <td style={styles.td}>{l.status}</td>
              <td style={styles.td}>
                {l.status === 'Pending' && (
                  <>
                    <button style={{ ...styles.button, backgroundColor: '#4CAF50' }} onClick={() => updateLeave(l._id, 'Accepted')}>Accept</button>
                    <button style={{ ...styles.button, backgroundColor: '#f44336' }} onClick={() => updateLeave(l._id, 'Rejected')}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    border: '1px solid #ddd',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  button: {
    marginRight: '10px',
    padding: '6px 12px',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LeaveRequests;
