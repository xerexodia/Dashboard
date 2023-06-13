import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { url } from 'constants/urls';
const Visit = () => {
    const [visits, setVisits] = useState([]);

    const getVisits = async () => {
        return axios.get(`${url}VisitDetails/AllVisits`);
    };
    const deleteVisit = async (id) => {
        await axios.delete(`${url}VisitDetails/Visit/${id}`);
        const filtred = visits.filter((item) => item.id !== id);
        setVisits(filtred);
    };
    console.log(visits);
    useEffect(() => {
        getVisits()
            .then((res) => setVisits(res.data))
            .catch((err) => console.log(err));

        return () => {};
    }, []);

    return (
        <div>
            <div className="dash-header">
                <span>Liste des visites</span>
            </div>
            <div className="grid-data">
                <div>
                    <span>visite id</span>
                    <span>machine id</span>
                    <span>visit number</span>
                    <span>visite date</span>
                    <span>final state</span>
                    <span>Action</span>
                </div>
                <div className="grid-body">
                    {visits.length > 0 ? (
                        visits.map((item, idx) => (
                            <div key={idx}>
                                <span>#{item.id}</span>
                                <span>#{item.machineSerialNumber}</span>
                                <span>#{item.visitNumber}</span>
                                <span>{item.visitDate}</span>
                                <span>{item.finalState}</span>
                                <span>
                                    <DeleteOutlined onClick={() => deleteVisit(item.id)} />
                                </span>
                            </div>
                        ))
                    ) : (
                        <span>no visits yet</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Visit;
