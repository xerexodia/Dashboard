import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { url } from 'constants/urls';

const Visit = () => {
  const [visits, setVisits] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [visitToDelete, setVisitToDelete] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const [filterSerialNumber, setFilterSerialNumber] = useState('');
  const [filteredVisits, setFilteredVisits] = useState([]);

  const getVisits = async () => {
    try {
      const response = await axios.get(`${url}VisitDetails/AllVisits`);
      setVisits(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVisit = async (id) => {
    await axios.delete(`${url}VisitDetails/Visit/${id}`);
    const filtered = visits.filter((item) => item.id !== id);
    setVisits(filtered);
    setDeleteConfirmation(false);
    setVisitToDelete(null);
  };

  const filterVisits = () => {
    const filteredVisits = visits.filter((visit) => {
      const matchDate = visit.visitDate.includes(filterDate);
      const matchSerialNumber = visit.machineSerialNumber.includes(filterSerialNumber);
      return matchDate && matchSerialNumber;
    });
    setFilteredVisits(filteredVisits);
  };

  useEffect(() => {
    getVisits();
  }, []);

  useEffect(() => {
    filterVisits();
  }, [filterDate, filterSerialNumber, visits]);

  const handleDeleteConfirmation = (visit) => {
    setDeleteConfirmation(true);
    setVisitToDelete(visit);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmation(false);
    setVisitToDelete(null);
  };

  return (
    <div>
      <div className="dash-header">
        <span>Liste des visites</span>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Filter by visit date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by machine serial number"
          value={filterSerialNumber}
          onChange={(e) => setFilterSerialNumber(e.target.value)}
        />
      </div>

      <div className="grid-data">
        <div>
          <span>visite id</span>
          <span>machine id</span>
          <span>numéro visite</span>
          <span>date visite </span>
          <span>état final</span>
          <span>Action</span>
        </div>
        <div className="grid-body">
          {filteredVisits.length > 0 ? (
            filteredVisits.reverse().map((item, idx) => (
              <div key={idx}>
                <span>#{item.id}</span>
                <span>#{item.machineSerialNumber}</span>
                <span>#{item.visitNumber}</span>
                <span>{item.visitDate}</span>
                <span>{item.finalState}</span>
                <span>
                  <DeleteOutlined onClick={() => handleDeleteConfirmation(item)} />
                </span>
              </div>
            ))
          ) : (
            <span>no visits yet</span>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && visitToDelete && (
        <div className="delete-confirmation-modal">
          <div className="modal-content">
            <h3>Confirmation</h3>
            <p>Êtes-vous sûr de vouloir supprimer la visite avec ce ID#{visitToDelete.id}?</p>
            <div className="modal-buttons">
              <button onClick={() => deleteVisit(visitToDelete.id)}>Yes</button>
              <button onClick={handleDeleteCancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visit;
