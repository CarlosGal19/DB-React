import { useState } from "react";
import axiosClient from "../axios/axios";

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    university_id: '',
    grade: '',
    major: '',
    grades: {
      math: '',
      languaje: '',
      chemistry: ''
    }
  });
  const [added, setAdded] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name in formData.grades) {
      setFormData({
        ...formData,
        grades: {
          ...formData.grades,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form data:', formData);
    try {
      const response = await axiosClient.post('/', formData);
      setAdded(true);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  return (
    <div className="form-container">
      <br />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>ID de Universidad:</label>
          <input
            type="text"
            name="university_id"
            value={formData.university_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Grado:</label>
          <input
            type="number"
            name="grade"
            value={formData.grade}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Major:</label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nota de Matemáticas:</label>
          <input
            type="number"
            name="math"
            value={formData.grades.math}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nota de Lenguaje:</label>
          <input
            type="number"
            name="languaje"
            value={formData.grades.languaje}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nota de Química:</label>
          <input
            type="number"
            name="chemistry"
            value={formData.grades.chemistry}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
      <br />
    </div>
  );
};

export default Form;
