import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState({ single: 0, double: 0, triple: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/student/list')
      .then(res => {
        setStudents(res.data.students);
        setCount(res.data.count);
      })
      .catch(err => console.error('Error fetching students', err));
  }, []);

  const styles = {
    container: {
      marginLeft: '270px', // shift right to avoid sidebar
      padding: '30px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    summaryBox: {
      marginBottom: '20px',
      backgroundColor: '#f3f4f6',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    },
    th: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '12px',
      textAlign: 'left',
    },
    td: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    row: {
      backgroundColor: '#fff',
    },
    altRow: {
      backgroundColor: '#f9fafb',
    }
  };

  return (
    <div style={styles.container}>
      <h2>All Students</h2>
      <div style={styles.summaryBox}>
        <p><strong>Single:</strong> {count.single}</p>
        <p><strong>Double:</strong> {count.double}</p>
        <p><strong>Triple:</strong> {count.triple}</p>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Age</th>
            <th style={styles.th}>DOB</th>
            <th style={styles.th}>Room Type</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, index) => (
            <tr key={s._id} style={index % 2 === 0 ? styles.row : styles.altRow}>
              <td style={styles.td}>{s.name}</td>
              <td style={styles.td}>{s.age}</td>
              <td style={styles.td}>{new Date(s.dob).toLocaleDateString()}</td>
              <td style={styles.td}>{s.roomType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudents;
