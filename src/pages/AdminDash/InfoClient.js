import React from 'react';
import 'styles/infoClient.scss';
import { MessageOutlined } from '@ant-design/icons';

const InfoClient = () => {
    return (
        <div className="info-client-container">
            <div className="message-container">
                <div className="msg-box">
                    <div className="msg">
                        <span>jihed</span>
                        <span>
                            qsdlqkqsdqsd qsdq qsdqsddddddddddddddddddd ddddddddddddddd dddddddddddddddd dddddddddddddddddddddddddd qsdsd
                            qsdqsd qsdqsd sds qsdqsd qsd qsd qsd sdqsd qsd sqd jsqsd qsd qsdjqsdsqd qsdjqsldqld
                        </span>
                    </div>
                    <MessageOutlined style={{ fontSize: '22px', color: 'grey' }} />
                </div>
            </div>
        </div>
    );
};

export default InfoClient;
