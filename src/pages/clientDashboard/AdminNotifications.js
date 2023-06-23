import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useStateContext } from 'context/authContext';
import { url } from 'constants/urls';
import 'styles/AdminNotifications.scss';

function AdminNotifications() {
  const { user } = useStateContext();
  const [notificationsPart1, setNotificationsPart1] = useState([]);
  const [notificationsPart2, setNotificationsPart2] = useState([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const responsePart1 = await axios.get(`${url}MyMessage/AllMyMessages?clientId=${user.id}`);
        setNotificationsPart1(responsePart1.data);

        if (user.isContracted) {
          const responsePart2 = await axios.get(`${url}MyAlert/MyAlerts?clientId=${user.id}`);
          setNotificationsPart2(responsePart2.data);
        }
      } catch (error) {
        console.log('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [user.id, user.isContracted]);

  const handleAttachmentDownload = async (attachmentName, id) => {
    try {
      const response = await axios.get(`${url}MyMessage/MyFileMessage/${id}?clientId=${user.id}`, {
        responseType: 'blob',
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', attachmentName);
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.log('Error downloading attachment:', error);
    }
  };

  const handleDateFilterChange = (event) => {
    setSelectedDateFilter(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filteredNotificationsPart1 = selectedDateFilter
    ? notificationsPart1.filter((notification) => notification.creationDate.includes(selectedDateFilter))
    : notificationsPart1;

  const filteredNotificationsPart2 = selectedDateFilter
    ? notificationsPart2.filter((notification) => notification.creationDate.includes(selectedDateFilter))
    : notificationsPart2;

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <h2>Notifications</h2>
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
          {filteredNotificationsPart1.slice().reverse().map((notification) => (
            <div key={notification.id} className="notification-container">
              <div>
                <p>Message: {notification.message}</p>
                <p>Date: {formatDate(notification.creationDate)}</p>
                <button
                  className="attachment-button"
                  onClick={() => handleAttachmentDownload(notification.attachmentName, notification.id)}
                >
                  Download Attachment
                </button>
              </div>
            </div>
          ))}
        </div>
        {user.isContracted && (
          <div style={{ flex: 1  }}>
            <h2 style={{marginBottom :'83px'} }>Alerts</h2>
            {filteredNotificationsPart2.slice().reverse().map((notification) => (
              <div key={notification.id} className="notification-container">
                <div>
                  <p>Message: {notification.warningMessage}</p>
                  <p>Date: {formatDate(notification.creationDate)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminNotifications;
