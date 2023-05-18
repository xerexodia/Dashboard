import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';

const Visit = () => {
    return (
        <div>
            <div className="dash-header">
                <span>Liste des matériels</span>
            </div>
            <div className="grid-data">
                <div>
                    <span>visite id</span>
                    <span>machine id</span>
                    <span>clientId</span>
                    <span>visite date</span>
                    <span>final state</span>
                    <span>Action</span>
                </div>
                <div className="grid-body">
                    <div>
                        <span>#21qsd654321dq</span>
                        <span>#qsdqsqsd6541d</span>
                        <span>#6+23qsd4qsqd</span>
                        <span>27/12/2023</span>
                        <span>finished</span>
                        <span>
                            <DeleteOutlined />
                        </span>
                    </div>
                    <div>
                        <span>#21qsd654321dq</span>
                        <span>#qsdqsqsd6541d</span>
                        <span>#6+23qsd4qsqd</span>
                        <span>27/12/2023</span>
                        <span>finished</span>
                        <span>
                            <DeleteOutlined />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Visit;
