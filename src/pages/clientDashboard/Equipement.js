import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from 'context/authContext';
import { url } from 'constants/urls';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Equipement = () => {
  const { user } = useStateContext();
  console.log(user.id);
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();

  const getMachines = async () => {
    try {
      const response = await axios.get(`${url}MyMachine/MyMachines?clientId=${user.id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  console.log(machines);

  useEffect(() => {
    getMachines()
      .then((data) => setMachines(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="dash-header">
        <span>Liste des matériels</span>
      </div>
      <div className="grid-data">
        <div className="grid-header">
          <span>Numéro de série</span>
          <span>Machine Type</span>
          <span>Client ID</span>
          <span>Date de vente</span>
        </div>
        <div className="users-grid-body">
          {machines.length > 0 ? (
            machines.map((item, idx) => (
              <div
                key={idx}
                className="grid-row"
                onClick={() => navigate(`/dashboard/user/equipement/${item.serialNumber}`)}
              >
                <span>{item.serialNumber}</span>
                <span style={{ textAlign: 'center' }}>{item.machineType}</span>
                <span style={{ textAlign: 'center' }}>{item.userId}</span>
                <span style={{ textAlign: 'right' }}>{item.sellDate}</span>
              </div>
            ))
          ) : (
            <span>No machines found</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Equipement;
