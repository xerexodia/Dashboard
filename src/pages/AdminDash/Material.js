import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
const Material = () => {
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
                    <div>
                        <span>#21qsd654321dq</span>
                        <span>qsdqsd</span>
                        <span>#6+23qsd4qsqd</span>
                        <span>27/12/2023</span>
                        <span>
                            <DeleteOutlined />
                        </span>
                    </div>
                    <div>
                        <span>#21qsd654321dq</span>
                        <span>qdqsdzfer</span>
                        <span>#6+23qsd4qsqd</span>
                        <span>26/08/2023</span>
                        <span>
                            <DeleteOutlined />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Material;
