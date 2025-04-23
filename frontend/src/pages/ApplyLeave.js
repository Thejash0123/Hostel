import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplyLeave = ({ studentId }) => {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchMyLeaves();
  }, []);

  const fetchMyLeaves = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/leave/byStudent/${studentId}`);
      setLeaves(res.data);
    } catch (err) {
      console.error('Error fetching leaves:', err);
    }
  };

  const handleSubmit = async () => {
    if (!date || !reason) {
      alert('Please fill all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/leave/request', {
        studentId,
        date,
        reason
      });
      alert('Leave request submitted!');
      setDate('');
      setReason('');
      fetchMyLeaves();
    } catch (err) {
      console.error('Error submitting leave:', err);
      alert('Furthur Updates to be done.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Apply for Leave</h2>
      <div style={styles.form}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          value={reason}
          placeholder="Reason for leave"
          onChange={(e) => setReason(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.button}>Submit</button>
      </div>

      <h3>My Leave Requests</h3>
      <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((l) => (
            <tr key={l._id}>
              <td>{new Date(l.date).toLocaleDateString()}</td>
              <td>{l.reason}</td>
              <td>{l.status}</td>
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
    maxWidth: '600px',
    margin: 'auto',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  }
};

export default ApplyLeave;
