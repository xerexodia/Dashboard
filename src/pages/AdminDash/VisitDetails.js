import { url } from 'constants/urls';
import { useEffect, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'styles/visitDetails.scss';
import { ToastContainer, toast } from 'react-toastify';

const VisitDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [showFullComment, setShowFullComment] = useState(false);
  const [fileExtension, setFileExtension] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);


  const getVisits = async () => {
    try {
      const response = await axios.get(`${url}VisitDetails/visit/${id}`);
      const visitData = response.data;

      // Extract the file extension from the attachmentName
      const fileName = visitData.attachmentName;
      const extension = fileName.substring(fileName.lastIndexOf('.') + 1);

      setData(visitData);
      setFileExtension(extension);
      console.log(visitData);
      console.log('File Extension:', extension);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadFile = async () => {
    try {
      const response = await axios.get(`${url}VisitDetails/FileVisit/${id}`, {
        responseType: 'blob'
      });

      const downloadUrl = URL.createObjectURL(new Blob([response.data]));

      const fileName = `attachment_file.${fileExtension}`; // Use the fileExtension state value

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

  const handleToggleComment = () => {
    setShowFullComment(!showFullComment);
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };
  const handleSave = () => {
    // Update logic here...
    setIsEditMode(false);
  
    // Show toast notification
    toast.success('Updated successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };



  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('machineType', data.machineType);
      formData.append('visitNumber', data.visitNumber);
      formData.append('repaireType', data.repaireType);
      formData.append('finalState', data.finalState);
      formData.append('comment', data.comment);
      formData.append('cmRepaireType', data.cmRepaireType);
      formData.append('cmInvestigationFileNumber', data.cmInvestigationFileNumber);
      formData.append('cmInterventionFileNumber', data.cmInterventionFileNumber);
      formData.append('cmEnterDate', data.cmEnterDate);
      formData.append('cmReturnDate', data.cmReturnDate);
      formData.append('pmReturnDate', data.pmReturnDate);
      formData.append('pmInvestigationFileNumber', data.pmInvestigationFileNumber);
      formData.append('pmInterventionFileNumber', data.pmInterventionFileNumber);

      // Make the API call to update the data
      await axios.patch(`${url}VisitDetails/Visit/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Updated successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
    

  // Call getVisits to fetch the visit data
  useEffect(() => {
    getVisits();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="dash-header">
        <span>visite bien détaillée : </span>
        {isEditMode ? (
          <button onClick={handleSubmit}>Enregistrer</button>
        ) : (
          <button onClick={handleToggleEditMode}>Modifier</button>

          
        )}
      </div>

      <div className="visit-body">
        {data ? (
          <>
            <div className="section-body">
              <h2 className="section-title"> Informations Général</h2>
              <table className="data-table">
                <tbody>
                  <tr>
                    <td>id :</td>
                    <td>{data.id}</td>
                  </tr>
                  <tr>
                    <td>Numéro de série :</td>
                    <td>
                     {data.machineSerialNumber}
                    </td>
                  </tr>
                  <tr>
                    <td>Machine type:</td>
                    <td>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={data.machineType}
                          onChange={(e) => handleChange('machineType', e.target.value)}
                        />
                      ) : (
                        data.machineType
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Numéro de visite :</td>
                    <td>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={data.visitNumber}
                          onChange={(e) => handleChange('visitNumber', e.target.value)}
                        />
                      ) : (
                        data.visitNumber
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td> date visite :</td>
                    <td>{data.visitDate}</td>
                  </tr>
                  <tr>
                    <td>Type de réparation :</td>
                    <td>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={data.repaireType}
                          onChange={(e) => handleChange('repaireType', e.target.value)}
                        />
                      ) : (
                        data.repaireType
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Etat final :</td>
                    <td>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={data.finalState}
                          onChange={(e) => handleChange('finalState', e.target.value)}
                        />
                      ) : (
                        data.finalState
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Commentaire:</td>
                    <td>
                      {isEditMode ? (
                        <textarea
                          value={data.comment}
                          onChange={(e) => handleChange('comment', e.target.value)}
                        />
                      ) : (
                        <>
                          {!showFullComment ? (
                            <>
                              {data.comment.split(' ').slice(0, 3).join(' ')}{' '}
                              <button onClick={handleToggleComment}>More</button>
                            </>
                          ) : (
                            <>
                              {data.comment}{' '}
                              <button onClick={handleToggleComment}>Less</button>
                            </>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Rest of the sections */}
            <div className="section-body">
              <h2 className="section-title">Informations MC</h2>
              <table className="data-table">
                <tbody>
                  <tr>
                    <td>Type de réparation :</td>
                    <td>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={data.cmRepaireType}
                          onChange={(e) => handleChange('cmRepaireType', e.target.value)}
                        />
                      ) : (
                        data.cmRepaireType
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>InvestigationFileNumber:</td>
                    <td>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={data.cmInvestigationFileNumber}
                          onChange={(e) => handleChange('cmInvestigationFileNumber', e.target.value)}
                        />
                      ) : (
                        data.cmInvestigationFileNumber
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>InterventionFileNumber:</td>
                    <td>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={data.cmInterventionFileNumber}
                          onChange={(e) => handleChange('cmInterventionFileNumber', e.target.value)}
                        />
                      ) : (
                        data.cmInterventionFileNumber
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>EnterDate:</td>
                    <td>
                    {isEditMode ? (
                        <input
                          type="text"
                          value={data.cmEnterDate}
                          onChange={(e) => handleChange('cmEnterDate', e.target.value)}
                        />
                      ) : (
                        data.cmEnterDate
                      )}
                      </td>
                  </tr>
                  <tr>
                    <td>ReturnDate:</td>
                    <td>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={data.cmReturnDate}
                          onChange={(e) => handleChange('cmReturnDate', e.target.value)}
                        />
                      ) : (
                        data.cmReturnDate
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="section-body">
              <h2 className="section-title">Informations MP</h2>
              <table className="data-table">
                <tbody>
                  <tr>
                    <td>ReturnDate:</td>
                    <td>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={data.pmReturnDate}
                          onChange={(e) => handleChange('pmReturnDate', e.target.value)}
                        />
                      ) : (
                        data.pmReturnDate
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>InvestigationFileNumber:</td>
                    <td>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={data.pmInvestigationFileNumber}
                          onChange={(e) => handleChange('pmInvestigationFileNumber', e.target.value)}
                        />
                      ) : (
                        data.pmInvestigationFileNumber
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>InterventionFileNumber:</td>
                    <td>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={data.pmInterventionFileNumber}
                          onChange={(e) => handleChange('pmInterventionFileNumber', e.target.value)}
                        />
                      ) : (
                        data.pmInterventionFileNumber
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="section-body">
              <h2 className="section-title">File</h2>
              <table className="data-table">
                <tbody>
                  <tr>
                    <td>Pièce jointe:</td>
                    <td>
                      <button onClick={handleDownloadFile}>Download Attachment</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <span>loading...</span>
        )}
      </div>
    </div>
  );
};

export default VisitDetails;
