import axiosClient from "../axios/axios";
import { useEffect, useState } from "react";

const Table = () => {
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

  return (
    <div className="p-6 bg-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">University ID</th>
              <th className="py-2 px-4 border-b border-gray-200">Grade</th>
              <th className="py-2 px-4 border-b border-gray-200">Major</th>
              <th className="py-2 px-4 border-b border-gray-200">Math Grade</th>
              <th className="py-2 px-4 border-b border-gray-200">Language Grade</th>
              <th className="py-2 px-4 border-b border-gray-200">Chemistry Grade</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student.id} className="text-center">
                <td className="py-2 px-4 border-b border-gray-200">{student.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{student.university_id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{student.grade}</td>
                <td className="py-2 px-4 border-b border-gray-200">{student.major}</td>
                <td className="py-2 px-4 border-b border-gray-200">{student.grades?.math}</td>
                <td className="py-2 px-4 border-b border-gray-200">{student.grades?.languaje}</td>
                <td className="py-2 px-4 border-b border-gray-200">{student.grades?.chemistry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
