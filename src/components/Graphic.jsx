import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axiosClient from '../axios/axios';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentGradesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get('/');
        console.log('Data fetched: ', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const processChartData = () => {
    const labels = data.map(student => student.name);
    const mathGrades = data.map(student => student.grades.math);
    const languageGrades = data.map(student => student.grades.languaje);
    const chemistryGrades = data.map(student => student.grades.chemistry);

    return {
      labels,
      datasets: [
        {
          label: 'Math',
          data: mathGrades,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Language',
          data: languageGrades,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
        {
          label: 'Chemistry',
          data: chemistryGrades,
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
        },
      ],
    };
  };

  return (
    <div>
      <h2>Student Grades</h2>
      <Bar
        data={processChartData()}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 10,
            },
          },
        }}
      />
    </div>
  );
};

export default StudentGradesChart;
