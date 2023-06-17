import React, { useEffect, useState } from 'react';
import { url } from 'constants/urls';
import { MessageOutlined, DownloadOutlined } from '@ant-design/icons';
import 'styles/infoClient.scss';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';
import { Formik, Form, Field } from 'formik';

const ResponseForm = ({ requestId, onSubmit }) => (
  <Formik
    initialValues={{ response: '', attachment: null }}
    onSubmit={(values, { resetForm }) => {
      onSubmit(requestId, values);
      resetForm();
    }}
  >
    {({ values, handleChange, setFieldValue }) => (
      <Form>
        <div>
          <label htmlFor="response">Response:</label>
          <Field
            as="textarea"
            id="response"
            name="response"
            value={values.response}
            onChange={handleChange}
          />

          <label htmlFor="attachment">Attachment:</label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            onChange={(event) => setFieldValue('attachment', event.target.files[0])}
          />
        </div>

        <button type="submit">Submit</button>
      </Form>
    )}
  </Formik>
);

const InfoClient = () => {
  const [requestData, setRequestData] = useState([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState('');
  const [selectedUsernameFilter, setSelectedUsernameFilter] = useState('');

  const fetchRequestData = async () => {
    try {
      const response = await axios.get(`${url}Request/AllRequests`);
      setRequestData(response.data.map((request) => ({ ...request, showFullComment: false })));
    } catch (error) {
      console.error('Error fetching request data:', error);
    }
  };

  const handleDownloadFile = async (id, attachmentName) => {
    try {
      const response = await axios.get(`${url}Request/FileRequest/${id}`, {
        responseType: 'blob',
      });

      const downloadUrl = URL.createObjectURL(new Blob([response.data]));

      const extension = attachmentName?.substring(attachmentName.lastIndexOf('.') + 1);
      const fileName = `attachment_file.${extension}`;

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();

      URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleToggleComment = (requestId) => {
    setRequestData((prevData) =>
      prevData.map((request) =>
        request.id === requestId ? { ...request, showFullComment: !request.showFullComment } : request
      )
    );
  };

  const handleDateFilterChange = (event) => {
    setSelectedDateFilter(event.target.value);
  };

  const handleUsernameFilterChange = (event) => {
    setSelectedUsernameFilter(event.target.value);
  };

  useEffect(() => {
    fetchRequestData();
  }, []);

  const filteredRequests = requestData.filter((request) => {
    const matchesUsername =
      request.user && request.user.userName.includes(selectedUsernameFilter);
    const matchesDate =
      selectedDateFilter === '' ||
      request.creationDate.includes(selectedDateFilter);

    return matchesUsername && matchesDate;
  });

  if (requestData.length === 0) {
    return <span>Loading...</span>;
  }

  const handleRespond = async (requestId, values) => {
    try {
      const formData = new FormData();
      formData.append('response', values.response);
      formData.append('attachment', values.attachment);
      formData.append('clientRequestId', requestId);

      await axios.post(`${url}Response/AddResponse`, formData);
      console.log('Response submitted successfully');
      toast.success('Response submitted successfully'); // Display success message
    } catch (error) {
      console.error('Error submitting response:', error);
      toast.error('Failed to submit response'); // Display error message
    }
  };

  return (
    <div className="info-client-container">
      <div className="filters">
        <label htmlFor="dateFilter">Date :</label>
        <input
          type="text"
          id="dateFilter"
          value={selectedDateFilter}
          placeholder="date"
          onChange={handleDateFilterChange}
        />

        <label htmlFor="usernameFilter">client name :</label>
        <input
          type="text"
          id="usernameFilter"
          placeholder="client name"
          value={selectedUsernameFilter}
          onChange={handleUsernameFilterChange}
        />
      </div>

      <div className="message-container">
        {filteredRequests.length === 0 ? (
          <span>No matching requests found.</span>
        ) : (
          filteredRequests.map((request) => (
            <div className="msg-box" key={request.id}>
              <div className="msg">
                <span>Client : {request.user && request.user.userName}</span>
                <span>Type de réclamation : {request.requestType}</span>
                <span>Date : {request.creationDate.split('T')[0]}</span>
                <td>
                <span> Description : </span>
                  {!request.showFullComment ? (
                    <>
                      {request.fullDescription.split(' ').slice(0, 10).join(' ')}{' '}
                      {request.fullDescription.split(' ').length > 10 && '... '}
                      <button onClick={() => handleToggleComment(request.id)}>More</button>
                    </>
                  ) : (
                    <>
                      {request.fullDescription}{' '}
                      <button onClick={() => handleToggleComment(request.id)}>Less</button>
                    </>
                  )}
                </td>

                {request.attachmentName && (
                  <button
                    className="download-button"
                    onClick={() => handleDownloadFile(request.id, request.attachmentName)}
                  >
                    Download File
                  </button>
                )}
              </div>
              <MessageOutlined
                style={{ fontSize: '30px', color: 'grey' }}
                onClick={() => handleToggleComment(request.id)}
              />

              {request.showFullComment && (
                <div className="response-form-container">
                  <ResponseForm requestId={request.id} onSubmit={handleRespond} />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <ToastContainer /> {/* Add this component to display the toast messages */}
    </div>
  );
};

export default InfoClient;
