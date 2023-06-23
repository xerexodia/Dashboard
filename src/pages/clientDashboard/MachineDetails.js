import { useStateContext } from 'context/authContext';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from 'constants/urls';

const MachineDetails = () => {
  const [machine, setMachine] = useState({});
  const { machineId } = useParams();
  const { user } = useStateContext();
  const [selectedDateFilter, setSelectedDateFilter] = useState('');

  const getMachine = async () => {
    try {
      const response = await axios.get(`${url}MyMachine/${machineId}?clientId=${user.id}`);
      setMachine(response.data);
    } catch (error) {
      console.log('Error fetching machine data:', error);
    }
  };

  console.log(machine);

  useEffect(() => {
    getMachine();
  }, []);

  const handleDateFilterChange = (e) => {
    setSelectedDateFilter(e.target.value);
  };

  const downloadAttachment = async (attachmentName, id) => {
    try {
      const response = await axios.get(
        `${url}MyMachineStateNotification/FileNotification/${id}?clientId=${user.id}`,
        {
          responseType: 'blob',
        }
      );

      const attachmentUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = attachmentUrl;
      link.setAttribute('download', attachmentName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading attachment:', error);
    }
  };

  const handleShowMore = (item) => {
    item.showFullMessage = true;
    setMachine((prevMachine) => ({ ...prevMachine }));
  };

  const handleShowLess = (item) => {
    item.showFullMessage = false;
    setMachine((prevMachine) => ({ ...prevMachine }));
  };

  const formatMessage = (message, showFullMessage) => {
    const words = message.split(' ');
    if (showFullMessage || words.length <= 6) {
      return message;
    }
    return (
      <>
        {words.slice(0, 6).join(' ')} <br />
        {words.slice(6).join(' ')}
      </>
    );
  };

  const filteredNotifications = selectedDateFilter
    ? machine?.machineStateNotification?.filter((item) => {
        const eventDate = new Date(item.eventDate);
        const filterDate = new Date(selectedDateFilter);

        if (isNaN(eventDate) || isNaN(filterDate)) {
          return false; // Invalid date, exclude the item from filteredNotifications
        }

        const eventDateString = eventDate.toISOString().substring(0, 10);
        const filterDateString = filterDate.toISOString().substring(0, 10);

        return eventDateString.includes(filterDateString);
      })
    : machine?.machineStateNotification || [];

  return (
    <div>
      <div className="dash-header">
        <span>Machine Détails</span>
      </div>

      <div className="machine-detail-box">
        <div>
          <span>
            Numéro de série: <span style={{ fontWeight: '500' }}>#{machine?.serialNumber}</span>
          </span>
          <span>
            type: <span style={{ fontWeight: '500' }}>{machine?.machineType}</span>
          </span>
          <span>
            date de vente:<span style={{ fontWeight: '500' }}>{machine?.sellDate}</span>
          </span>
        </div>
        <div />
      </div>

      <h2>Visits</h2>
      <div className="filters">
        <label htmlFor="dateFilter">Date:</label>
        <input
          type="text"
          id="dateFilter"
          value={selectedDateFilter}
          placeholder="date"
          onChange={handleDateFilterChange}
        />
      </div>
      <div className="grid-data">
        <div>
          <span>date de l'événement</span>
          <span>État de la machine</span>
          <span>message</span>
          <span>File</span>
        </div>
        <div className="grid-body">
          {!machine || !machine.machineStateNotification || filteredNotifications.length === 0 ? (
            <span>Aucune notification à afficher pour la date sélectionnée.</span>
          ) : (
            filteredNotifications.slice().reverse().map((item) => (
              <div key={item.id}>
                <span>{item.eventDate.substring(0, 10)}</span>
                <span>{item.machineState}</span>
                <span className="message">
                  {formatMessage(item.message, item.showFullMessage)}
                  {item.message.split(' ').length > 7 && (
                    <button onClick={() => (item.showFullMessage ? handleShowLess(item) : handleShowMore(item))}>
                      more
                    </button>
                  )}
                </span>
                {item.attachmentName ? (
                  <span className="attachment" onClick={() => downloadAttachment(item.attachmentName, item.id)}>
                    {item.attachmentName}
                  </span>
                ) : (
                  <span className="attachment">-</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineDetails;
