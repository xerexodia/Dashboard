import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from 'assets/logo.png';
// material-ui
import { ButtonBase } from '@mui/material';

// project import
import config from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => (
    <ButtonBase disableRipple component={Link} to={'/'} sx={sx}>
        <span style={{ fontWeight: '500', fontSize: '34px' }}>TMS</span>
    </ButtonBase>
);

LogoSection.propTypes = {
    sx: PropTypes.object,
    to: PropTypes.string
};

export default LogoSection;
