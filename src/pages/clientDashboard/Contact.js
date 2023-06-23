import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'components/Modal';
import { url } from 'constants/urls';
import { useStateContext } from 'context/authContext';
import 'styles/ClientContact.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [showModal, setShowModal] = useState(false);
  const [requestType, setRequestType] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState('');

  const { user } = useStateContext();

  useEffect(() => {
    // Fetch the user's requests
    const getRequests = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}MyRequest/AllMyRequests/?clientId=${user.id}`);
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getRequests();
  }, [user.id]);

  const toggleResponses = async (requestId) => {
    const updatedRequests = requests.map((request) => {
      if (request.id === requestId) {
        return {
          ...request,
          showResponses: !request.showResponses,
          responses: request.showResponses ? [] : request.responses // Clear responses if hiding
        };
      }
      return request;
    });
    setRequests(updatedRequests);

    if (!updatedRequests.find((request) => request.id === requestId).showResponses) {
      // No need to fetch responses if hiding
      return;
    }

    try {
      const response = await axios.get(`${url}MyResponse/MyResponses/${requestId}?clientId=${user.id}`);
      const updatedRequest = updatedRequests.find((request) => request.id === requestId);
      updatedRequest.responses = response.data;
      setRequests([...updatedRequests]);
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  };

  const getAttachmentExtension = (attachmentName) => {
    return attachmentName.substring(attachmentName.lastIndexOf('.') + 1);
  };

  const downloadAttachment = async (response) => {
    try {
      const downloadResponse = await axios.get(
        `${url}MyResponse/MyFileResponse/${response.id}?clientId=${user.id}`,
        {
          responseType: 'blob',
        }
      );

      const attachmentUrl = window.URL.createObjectURL(new Blob([downloadResponse.data]));
      const link = document.createElement('a');
      link.href = attachmentUrl;
      link.setAttribute('download', response.attachmentName); // Use response.attachmentName as the downloaded file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading attachment:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userId', user.id); // Include the userId field
    formData.append('requestType', requestType);
    formData.append('fullDescription', fullDescription);
    formData.append('attachment', attachment);

    try {
      const response = await axios.post(
        `${url}MyRequest/SendRequest?cleintId=${user.id}`,
        formData
      );

      console.log(response.data);

      setShowModal(false);
      setRequestType('');
      setFullDescription('');
      setAttachment(null);
      toast.success('request submitted successfully'); // Display success message

    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  const handleDateFilterChange = (e) => {
    setSelectedDateFilter(e.target.value);
  };

  // Format creation date in the format XXXX-XX-XX
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Filter requests based on the selected date
  const filteredRequests = selectedDateFilter
    ? requests.filter((request) => formatDate(request.creationDate).includes(selectedDateFilter))
    : requests;

  return (
    <>
      <div className="dash-header">
        <span>Contact Admin</span>
      </div>
      <button className="contact-button" onClick={() => setShowModal(true)}>
        Envoyer Réclamation
      </button>
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
      <h3>Mes Réclamations :</h3>

      <div className="contact-body">
        {/* Modal component */}
        <Modal title="Envoyer Réclamation" onClose={() => setShowModal(false)} show={showModal}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="requestType">Type réclamation</label>
              <input
                type="text"
                id="requestType"
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                className="form-control"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="attachment">File</label>
              <input
                type="file"
                id="attachment"
                onChange={(e) => setAttachment(e.target.files[0])}
                className="form-control"
              />
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </Modal>

        {/* Display user's requests */}
        <div>
          {[...filteredRequests].reverse().map((request) => (
            <div key={request.id} className="request-item">
              <p>
                <strong>Type de réclamation :</strong> {request.requestType}
              </p>
              <p>
                <strong>Description:</strong> {request.fullDescription}
              </p>

              <p>
                <strong>date de création:</strong> {formatDate(request.creationDate)}
              </p>
              <button onClick={() => toggleResponses(request.id)}>
                {request.showResponses ? 'Hide Responses' : 'Show Responses'}
              </button>
              {request.showResponses && request.responses && (
                <div>
                  <h4>reponses:</h4>
                  {request.responses.map((response) => (
                    <div key={response.id} className="response-item">
                      <p>
                        <strong>Message:</strong> {response.response}
                      </p>
                      <p>
                        {response.attachment && (
                          <a href="#" onClick={() => downloadAttachment(response)}>
                            Download Attachment
                          </a>
                        )}
                      </p>
                      <p>
                        <strong> Date de création:</strong> {formatDate(response.creationDate)}
                      </p>
                      <hr />
                    </div>
                  ))}
                </div>
              )}
              <hr />
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Contact;
