import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = () => {
    return (
        <div style={{ display: 'flex', alignContent: 'center' }}>
            <div style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </div>
        </div>
    );
};

export default Spinner;
