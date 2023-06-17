import { useStateContext } from 'context/authContext';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { url } from 'constants/urls';
const MachineDetails = () => {
    const [machine, setMachine] = useState({});
    const { machineId } = useParams();
    const { user } = useStateContext();
    const getMachine = async () => {
        return await axios.get(`${url}MyMachine/4565465465?clientId=6`);
    };
    console.log(machine);
    useEffect(() => {
        getMachine()
            .then((res) => setMachine(res.data))
            .catch((err) => console.log(err));

        return () => {};
    }, []);

    return (
        <div>
            <div className="dash-header">
                <span>Machine Détails</span>
            </div>
            <div className="machine-detail-box">
                <div>
                    <span>
                        Numéro de série: <span style={{ fontWeight: '500' }}>#{machine?.serialNumber}</span>
                    </span>
                    <span>
                        id client: <span style={{ fontWeight: '500' }}>#{machine?.userId}</span>
                    </span>
                    <span>
                        type: <span style={{ fontWeight: '500' }}>{machine?.machineType}</span>
                    </span>
                    <span>
                        date de vente:<span style={{ fontWeight: '500' }}>{machine?.sellDate}</span>
                    </span>
                </div>
                <div />
            </div>
            <div className="machine-notif">
                <span>Machine Notifications</span>
                {machine?.machineStateNotification?.length > 0 ? (
                    machine?.machineStateNotification?.map((item) => (
                        <div className="notif" key={item.id}>
                            <span>{item?.message}</span>
                            <span>{item?.attachmentName}</span>
                        </div>
                    ))
                ) : (
                    <span>No notifications yet</span>
                )}
            </div>
        </div>
    );
};

export default MachineDetails;
