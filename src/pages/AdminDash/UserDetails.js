import React, { useState } from 'react';
import 'styles/userDetails.scss';
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
const UserDetails = () => {
    const [update, setUpdate] = useState(false);
    const [informerModal, setInformerModal] = useState(false);
    const [machineModal, setMachineModal] = useState(false);

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div>
            <div className="dash-header">
                <span>Utilisateur Détail</span>
            </div>
            <div className="userDetails-header">
                <div>
                    <span>id: qsd54446dqs34</span>
                    <span>email: email@email.com</span>
                    <span>telephone: 6564324654</span>
                    <span>contracted: true</span>
                    <span>admin: false</span>
                </div>
                <div>
                    <button onClick={() => setInformerModal(true)}>informer</button>
                    <button onClick={() => setUpdate(true)}>update</button>
                    <button>delete</button>
                </div>
                <Modal title="modifier utilisateur" onClose={() => setInformerModal(false)} show={informerModal}>
                    <Formik
                        initialValues={{
                            message: '',
                            piece: ''
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} style={{ padding: '20px 30px' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="message">Message</InputLabel>
                                            <OutlinedInput
                                                id="message"
                                                type="text"
                                                value={values.message}
                                                name="message"
                                                multiline
                                                maxRows={4}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter message"
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
                                            <InputLabel htmlFor="piece">Piece lointe</InputLabel>
                                            <OutlinedInput
                                                id="piece"
                                                type="file"
                                                value={values.piece}
                                                name="piece"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="piece jointe"
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
                                                Informer
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Modal>
                <Modal title="modifier utilisateur" onClose={() => setUpdate(false)} show={update}>
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
                                                modifier
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Modal>
            </div>
            <div className="dash-header">
                <span>liste des machines</span>
                <button onClick={() => setMachineModal(true)}>ajouter machine</button>
                <Modal title="ajouter machine" onClose={() => setMachineModal(false)} show={machineModal}>
                    <Formik
                        initialValues={{
                            serialNumber: '',
                            type: '',
                            saleDate: ''
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} style={{ padding: '20px 30px' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="serialNumber">Serial number</InputLabel>
                                            <OutlinedInput
                                                id="serialNumber"
                                                type="text"
                                                value={values.serialNumber}
                                                name="serialNumber"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter serial number"
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
                                            <InputLabel htmlFor="type">machine type</InputLabel>
                                            <OutlinedInput
                                                id="type"
                                                type="text"
                                                value={values.type}
                                                name="type"
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
                                            <InputLabel htmlFor="saleDate">Sale date</InputLabel>
                                            <OutlinedInput
                                                id="saleDate"
                                                type="text"
                                                value={values.saleDate}
                                                name="saleDate"
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
            <div className="users-grid-data">
                <div>
                    <span>serial number</span>
                    <span>machine type</span>
                    <span>clientId</span>
                    <span>sale date</span>
                </div>
                <div className="users-grid-body">
                    <div onClick={() => navigate('/dashboard/admin/users/qsdsddqqsdsd/machine/qsdqsdqsd')}>
                        <span>#21qsd654321dq</span>
                        <span>qsdqsd</span>
                        <span>#6+23qsd4qsqd</span>
                        <span>27/12/2023</span>
                    </div>
                    <div>
                        <span>#21qsd654321dq</span>
                        <span>qdqsdzfer</span>
                        <span>#6+23qsd4qsqd</span>
                        <span>26/08/2023</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
