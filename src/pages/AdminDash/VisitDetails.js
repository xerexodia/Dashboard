import { url } from 'constants/urls';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const VisitDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState();

    const getVisists = async () => {
        return await axios.get(`${url}VisitDetails/visit/${id}`);
    };
    console.log(data);
    useEffect(() => {
        getVisists()
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
        return () => {};
    }, []);

    return (
        <div>
            <div className="dash-header">
                <span>Visit Details</span>
            </div>

            <div className="visit-body">
                {data ? (
                    <>
                        <div>
                            <span>id: {data.id}</span>
                            <span>machine serial number: {data.machineSerialNumber}</span>
                            <span>machine type: {data.machineType}</span>
                            <span>final state: {data.visitNumber}</span>
                            <span>repaire type: {data.finalState}</span>
                        </div>
                        <div>
                            <span>id: {data.id}</span>
                            <span>machine serial number: {data.machineSerialNumber}</span>
                            <span>machine type: {data.machineType}</span>
                            <span>final state: {data.finalState}</span>
                            <span>repaire type: {data.finalState}</span>
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
