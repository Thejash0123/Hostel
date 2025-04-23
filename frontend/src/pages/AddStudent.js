import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '', age: '', dob: '', roomType: 'Single',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/student/add', formData);
    alert('Student added');
    setFormData({ name: '', age: '', dob: '', roomType: 'Single' });
  };

  const styles = {
    container: {
      marginLeft: '270px', // shift to the right of the sidebar
      padding: '30px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '400px',
    },
    input: {
      marginBottom: '15px',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#2563eb',
      color: 'white',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#1d4ed8',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          required
          style={styles.input}
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          onChange={handleChange}
          value={formData.age}
          required
          style={styles.input}
        />
        <input
          name="dob"
          type="date"
          onChange={handleChange}
          value={formData.dob}
          required
          style={styles.input}
        />
        <select
          name="roomType"
          onChange={handleChange}
          value={formData.roomType}
          style={styles.input}
        >
          <option>Single</option>
          <option>Double</option>
          <option>Triple</option>
        </select>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default AddStudent;
