import { url } from 'constants/urls';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'styles/visitDetails.scss';

const VisitDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [showFullComment, setShowFullComment] = useState(false);
  const [fileExtension, setFileExtension] = useState('');

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

  // Call getVisits to fetch the visit data
  useEffect(() => {
    getVisits();
  }, []);
  
  
 

  const handleToggleComment = () => {
    setShowFullComment(!showFullComment);
  };



  return (
    <div>
      <div className="dash-header">
        <span>Visit Details</span>
      </div>

      <div className="visit-body">
        {data ? (
          <>
            <div className="section-body">
              <h2 className="section-title">General Information</h2>
              <table className="data-table">
                <tbody>
                  <tr>
                    <td>id:</td>
                    <td>{data.id}</td>
                  </tr>
                  <tr>
                    <td>machine serial number:</td>
                    <td>{data.machineSerialNumber}</td>
                  </tr>
                  <tr>
                    <td>machine type:</td>
                    <td>{data.machineType}</td>
                  </tr>
                  <tr>
                    <td>visit number:</td>
                    <td>{data.visitNumber}</td>
                  </tr>
                  <tr>
                    <td>visit date:</td>
                    <td>{data.visitDate}</td>
                  </tr>
                  <tr>
                    <td>Repair type:</td>
                    <td>{data.repaireType}</td>
                  </tr>
                  <tr>
                    <td>final state:</td>
                    <td>{data.finalState}</td>
                  </tr>
                  <tr>
                  <td>Commentaire:</td>
                  <td>
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
                        </td>

                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section-body">
              <h2 className="section-title">CM Information</h2>
              <table className="data-table">
                <tbody>
                  <tr>
                    <td>RepairType:</td>
                    <td>{data.cmRepaireType}</td>
                  </tr>
                  <tr>
                    <td>InvestigationFileNumber:</td>
                    <td>{data.cmInvestigationFileNumber}</td>
                  </tr>
                  <tr>
                    <td>InterventionFileNumber:</td>
                    <td>{data.cmInterventionFileNumber}</td>
                  </tr>
                  <tr>
                    <td>EnterDate:</td>
                    <td>{data.cmEnterDate}</td>
                  </tr>
                  <tr>
                    <td>ReturnDate:</td>
                    <td>{data.cmReturnDate}</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>

            <div className="section-body">
              <h2 className="section-title">PM Information</h2>
              <table className="data-table">
                <tbody>
                  <tr>
                    <td>ReturnDate:</td>
                    <td>{data.pmReturnDate}</td>
                  </tr>
                  <tr>
                    <td>InvestigationFileNumber:</td>
                    <td>{data.pmInvestigationFileNumber}</td>
                  </tr>
                  <tr>
                    <td>InterventionFileNumber:</td>
                    <td>{data.pmInterFileNumber}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section-body">
              <h2 className="section-title">Attachment</h2>
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
