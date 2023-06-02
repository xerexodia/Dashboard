import React, { useState, useEffect } from 'react';
import 'styles/headerDash.scss';
import { useNavigate } from 'react-router-dom';
import Modal from 'components/Modal';
import { Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
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
import axios from 'axios';
// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { url } from 'constants/urls';
import { toInteger } from 'lodash';
import { integer, trans } from 'utils/helpers';
import Spinner from 'components/Spinner';

// =========
const Users = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // ================ || api requests || =======================

    // get all users
    const getUsers = async () => {
        setLoading(true);
        return await axios.get(`${url}Profile/AllUsers`);
    };
    useEffect(() => {
        getUsers()
            .then((res) => {
                setUsers(res.data), setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
        return () => {};
    }, []);
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
                    {loading ? (
                        <Spinner />
                    ) : (
                        <>
                            {users?.map((user, idx) => (
                                <div key={idx} onClick={() => navigate(`/dashboard/admin/users/${user.id}`)}>
                                    <span>{user.id}</span>
                                    <span>{user.userName}</span>
                                    <span>{user.emailAddress}</span>
                                    <span>{user.phoneNumber}</span>
                                    <span>{trans(user.isAdmin)}</span>
                                    <span>{trans(user.isContracted)}</span>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
            <Modal title="ajouter utilisateur" onClose={() => setShow(false)} show={show}>
                <Formik
                    initialValues={{
                        userName: '',
                        password: '',
                        emailAddress: '',
                        phoneNumber: '',
                        isAdmin: false,
                        isContracted: false
                    }}
                    onSubmit={async (values) => {
                        try {
                            setLoading(true);
                            const data = await axios.post(`${url}Profile/AddUser`, {
                                userName: values.userName,
                                emailAddress: values.emailAddress,
                                password: values.password,
                                isAdmin: integer(values.isAdmin),
                                isContracted: integer(values.isContracted),
                                phoneNumber: values.phoneNumber
                            });
                            console.log(data);
                            if (data.status == 200) {
                                setUsers((prev) => [...prev, data.data]);
                                setLoading(false);
                                setShow(false);
                                toast.success('user created successfully', {
                                    autoClose: 2000
                                });
                            }
                        } catch (error) {
                            console.log(error);
                            setLoading(false);
                        } finally {
                            setLoading(false);
                        }
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
                                            value={values.emailAddress}
                                            name="emailAddress"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter email address"
                                            fullWidth
                                            error={Boolean(touched.emailAddress && errors.emailAddress)}
                                        />
                                        {touched.emailAddress && errors.emailAddress && (
                                            <FormHelperText error id="standard-weight-helper-text-emailAddress-login">
                                                {errors.emailAddress}
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
                                            error={Boolean(touched.userName && errors.userName)}
                                        />
                                        {touched.userName && errors.userName && (
                                            <FormHelperText error id="standard-weight-helper-text-userName-login">
                                                {errors.userName}
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
                                            value={values.phoneNumber}
                                            name="phoneNumber"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter num tel"
                                            fullWidth
                                            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                        />
                                        {touched.phoneNumber && errors.phoneNumber && (
                                            <FormHelperText error id="standard-weight-helper-text-phoneNumber-login">
                                                {errors.phoneNumber}
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
                                                    name="isAdmin"
                                                    color="primary"
                                                    size="small"
                                                />
                                            }
                                            label={<Typography variant="h6">admin</Typography>}
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
                                                    name="isContracted"
                                                    color="primary"
                                                    size="small"
                                                />
                                            }
                                            label={<Typography variant="h6">isContracted</Typography>}
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
            <ToastContainer />
        </div>
    );
};

export default Users;
