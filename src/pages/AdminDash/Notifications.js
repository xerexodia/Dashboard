import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from 'constants/urls';
import { ToastContainer } from 'react-toastify';
import { MessageOutlined, DownloadOutlined } from '@ant-design/icons';
import 'styles/Notifications.scss';

const Notifications = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [clientIdFilter, setClientIdFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get(`${url}PurchaseOrder/AllPurchasesOrder`);
      setPurchaseOrders(response.data);
    } catch (error) {
      console.error('Error fetching purchase orders:', error);
    }
  };

  const handleDownloadFile = async (id, attachmentName) => {
    try {
      const fileData = await fetchPurchaseOrderFile(id);
      if (fileData) {
        const extension = attachmentName?.substring(attachmentName.lastIndexOf('.') + 1);
        const fileName = `attachment_file.${extension}`;
        downloadFile(fileData, fileName);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const fetchPurchaseOrderFile = async (id) => {
    try {
      const response = await axios.get(`${url}PurchaseOrder/FilePurchaseOrder/${id}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching purchase order file:', error);
      return null;
    }
  };

  const downloadFile = (data, fileName) => {
    const downloadUrl = URL.createObjectURL(new Blob([data]));

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(link);
  };

  const toggleMessage = (orderId) => {
    setPurchaseOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, showMessage: !order.showMessage } : order
      )
    );
  };

  const handleClientIdFilterChange = (event) => {
    setClientIdFilter(event.target.value);
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  const filteredPurchaseOrders = purchaseOrders.filter((order) => {
    const matchesClientId =
      order.userId && order.userId.toString().toLowerCase().includes(clientIdFilter.toLowerCase());
    const matchesDate = order.creationDate.includes(dateFilter);

    return matchesClientId && matchesDate;
  });

  if (purchaseOrders.length === 0) {
    return <span>Loading...</span>;
  }

  return (
    <div className="notifications-container">
      <div className="filters">
        <label htmlFor="clientIdFilter">Client ID:</label>
        <input
          type="text"
          id="clientIdFilter"
          value={clientIdFilter}
          placeholder="Client ID"
          onChange={handleClientIdFilterChange}
        />

        <label htmlFor="dateFilter">Date:</label>
        <input
          type="text"
          id="dateFilter"
          value={dateFilter}
          placeholder="Date"
          onChange={handleDateFilterChange}
        />
      </div>

      <div className="message-container">
        {filteredPurchaseOrders.reverse().map((order) => (
          <div className="msg-box" key={order.id}>
            <div className="msg">
              <span>User ID: {order.userId}</span>
              <span>Date de créaction : {order.creationDate.slice(0, 10)}</span>
              <span className="message">
                <span className="message-label">Message :</span>
                {!order.showMessage ? (
                  <>
                    <span className="message-value">{order.message?.split(' ').slice(0, 5).join(' ')}</span>{' '}
                    {order.message?.split(' ').length > 5 && (
                      <button className="more-button" onClick={() => toggleMessage(order.id)}>
                        More
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <span className="message-value">{order.message}</span>{' '}
                    {order.message?.split(' ').length > 5 && (
                      <button className="less-button" onClick={() => toggleMessage(order.id)}>
                        Less
                      </button>
                    )}
                  </>
                )}
              </span>

              {order.attachmentName && (
                <button
                  className="download-button"
                  onClick={() => handleDownloadFile(order.id, order.attachmentName)}
                >
                  Download File
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Notifications;
