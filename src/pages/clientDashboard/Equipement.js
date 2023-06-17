import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from 'context/authContext';
import { url } from 'constants/urls';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Equipement = () => {
    const { user } = useStateContext();
    console.log(user.id);
    const [machines, setMachines] = useState([]);
    const navigate = useNavigate();
    const getMachines = async () => {
        return await axios.get(`${url}MyMachine/MyMachines?clientId${user.id}`);
    };
    console.log(machines);
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
                <div className="users-grid-body">
                    {machines.length > 0 ? (
                        machines.map((item, idx) => (
                            <div key={idx} onClick={() => navigate(`/dashboard/user/equipement/${item.serialNumber}`)}>
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
