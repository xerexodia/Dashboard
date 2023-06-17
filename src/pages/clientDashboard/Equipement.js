import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from 'context/authContext';
import { url } from 'constants/urls';
import { DeleteOutlined } from '@ant-design/icons';

const Equipement = () => {
    const { user } = useStateContext();
    const [machines, setMachines] = useState([]);
    const getMachines = async () => {
        return await axios.get(`${url}MyMachine/MyMachines?clientId=7`);
    };
    useEffect(() => {
        getMachines()
            .then((res) => setMachines(res.data))
            .catch((err) => console.log(err));

        return () => {};
    }, []);

    return (
        <div>
            <div className="dash-header">
                <span>Liste des matériels</span>
            </div>
            <div className="grid-data">
                <div>
                    <span>serial number</span>
                    <span>machine type</span>
                    <span>clientId</span>
                    <span>sale date</span>
                </div>
                <div className="grid-body">
                    {machines.length > 0 ? (
                        machines.map((item, idx) => (
                            <div key={idx}>
                                <span>#{item.serialNumber}</span>
                                <span>{item.machineType}</span>
                                <span>#{item.userId}</span>
                                <span>{item.sellDate}</span>
                            </div>
                        ))
                    ) : (
                        <span>no machines found</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Equipement;
