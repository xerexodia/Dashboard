import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { url } from 'constants/urls';
import Spinner from 'components/Spinner';
import { useStateContext } from 'context/authContext';

const Material = () => {
    const [machines, setMachines] = useState([]);
    const getMachines = async () => {
        return await axios.get(`${url}Machine/AllMachines`);
    };
    const deleteMachine = async (id) => {
        await axios.delete(`${url}Machine/${id}`);
        const filter = machines.filter((item) => item.serialNumber !== id);
        setMachines(filter);
    };
    React.useEffect(() => {
        getMachines()
            .then((res) => {
                setMachines(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        return () => {
            setMachines([]);
        };
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
                    <span>Action</span>
                </div>
                <div className="grid-body">
                    {machines.length > 0 ? (
                        machines.map((item, idx) => (
                            <div>
                                <span>#{item.serialNumber}</span>
                                <span>{item.machineType}</span>
                                <span>#{item.userId}</span>
                                <span>{item.sellDate}</span>
                                <span>
                                    <DeleteOutlined
                                        onClick={() => {
                                            deleteMachine(item.serialNumber);
                                        }}
                                    />
                                </span>
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

export default Material;
