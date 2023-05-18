import React, { useState, useEffect } from 'react';
import 'styles/headerDash.scss';
import { useNavigate } from 'react-router-dom';
import Modal from 'components/Modal';
import { Formik } from 'formik';
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// =========
const Users = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div>
            <div className="dash-header">
                <span>liste des utilisateurs</span>
                <button onClick={() => setShow(true)}>ajouter utilisateur</button>
            </div>
            <div className="users-grid-data">
                <div>
                    <span>id</span>
                    <span>name</span>
                    <span>email</span>
                    <span>télephone</span>
                    <span>isAdmin</span>
                    <span>contracted</span>
                </div>
                <div className="users-grid-body">
                    <div onClick={() => navigate('/dashboard/admin/users/qsdsdqsdsd')}>
                        <span>#21qsd654321dq</span>
                        <span>jihed</span>
                        <span>jihed@gmail.com</span>
                        <span>2236501523</span>
                        <span>true</span>
                        <span>true</span>
                    </div>
                    <div>
                        <span>#21qsd654321dq</span>
                        <span>jihed</span>
                        <span>jihed@gmail.com</span>
                        <span>2236501523</span>
                        <span>true</span>
                        <span>true</span>
                    </div>
                </div>
            </div>
            <Modal title="ajouter utilisateur" onClose={() => setShow(false)} show={show}>
                <Formik
                    initialValues={{
                        userName: '',
                        password: '',
                        email: '',
                        phone: '',
                        admin: '',
                        contracted: ''
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit} style={{ padding: '20px 30px' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="email"
                                            value={values.email}
                                            name="email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter email address"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="user-name">User Name</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="text"
                                            value={values.userName}
                                            name="userName"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter user name"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="email-login">telephone</InputLabel>
                                        <OutlinedInput
                                            id="email-login"
                                            type="text"
                                            value={values.phone}
                                            name="phone"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter email address"
                                            fullWidth
                                            error={Boolean(touched.email && errors.email)}
                                        />
                                        {touched.email && errors.email && (
                                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                                {errors.email}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="password-login">Password</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            error={Boolean(touched.password && errors.password)}
                                            id="-password-login"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            name="password"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            placeholder="Enter password"
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sx={{ mt: -1 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    // checked={checked}
                                                    onChange={handleChange}
                                                    name="admin"
                                                    color="primary"
                                                    size="small"
                                                />
                                            }
                                            label={<Typography variant="h6">Admin</Typography>}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sx={{ mt: -1 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    // checked={checked}
                                                    onChange={handleChange}
                                                    name="contracted"
                                                    color="primary"
                                                    size="small"
                                                />
                                            }
                                            label={<Typography variant="h6">contracted</Typography>}
                                        />
                                    </Stack>
                                </Grid>
                                {errors.submit && (
                                    <Grid item xs={12}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Grid>
                                )}

                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Ajouter
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
};

export default Users;
