import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { url } from 'constants/urls';
import Spinner from 'components/Spinner';
import 'styles/materiel.scss';

import { useStateContext } from 'context/authContext';

const Material = () => {
  const [machines, setMachines] = useState([]);
  const [userIdFilter, setUserIdFilter] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [machineToDelete, setMachineToDelete] = useState(null);
  const navigate = useNavigate();

  const getMachines = async () => {
    try {
      const response = await axios.get(`${url}Machine/AllMachines`);
      setMachines(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMachine = async (id) => {
    await axios.delete(`${url}Machine/${id}`);
    const filter = machines.filter((item) => item.serialNumber !== id);
    setMachines(filter);
    setDeleteConfirmation(false);
    setMachineToDelete(null);
  };

  useEffect(() => {
    getMachines();
    return () => {
      setMachines([]);
    };
  }, []);

  const handleUserIdFilterChange = (event) => {
    setUserIdFilter(event.target.value);
  };

  const handleDeleteConfirmation = (machine) => {
    setDeleteConfirmation(true);
    setMachineToDelete(machine);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation(false);
    setMachineToDelete(null);
  };

  const filteredMachines = machines.filter((item) => item.userId.toString().includes(userIdFilter));

  return (
    <div>
      <div className="dash-header">
        <span>Liste des matériels</span>
      </div>
      <div>
        <input
          type="text"
          placeholder="Filter by User ID"
          value={userIdFilter}
          onChange={handleUserIdFilterChange}
        />
      </div>
      <div className="grid-data">
        <div>
        <span>clientId</span>
          <span>serial number</span>
          <span>machine type</span>
          
          <span>sale date</span>
          <span>Action</span>
        </div>
        <div className="grid-body">
          {filteredMachines.length > 0 ? (
            filteredMachines.map((item, idx) => (
              <div key={idx}>
                <span>{item.userId}</span>
                <span>#{item.serialNumber}</span>
                <span>{item.machineType}</span>
                <span>{item.sellDate}</span>
                <span>
                  <DeleteOutlined
                    onClick={() => handleDeleteConfirmation(item)}
                  />
                </span>
              </div>
            ))
          ) : (
            <span>no machines found</span>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && machineToDelete && (
        <div className="delete-confirmation-modal">
          <div className="modal-content">
            <h3>Confirmation</h3>
            <p>Are you sure you want to delete the machine with serial number #{machineToDelete.serialNumber}?</p>
            <div className="modal-buttons">
              <button onClick={() => deleteMachine(machineToDelete.serialNumber)}>Yes</button>
              <button onClick={handleDeleteCancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Material;
