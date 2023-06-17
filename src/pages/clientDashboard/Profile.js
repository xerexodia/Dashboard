import { useStateContext } from 'context/authContext';
import React from 'react';
import { trans } from 'utils/helpers';

const Profile = () => {
    const { user } = useStateContext();
    console.log(user);
    return (
        <>
            <div className="dash-header">
                <span>Profile</span>
            </div>
            <div
                style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    width: '40%',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 20
                }}
            >
                <span>email: {user.emailAddress}</span>
                <span>name: {user.userName}</span>
                <span>contracted: {trans(user.isContracted)}</span>
            </div>
        </>
    );
};

export default Profile;
