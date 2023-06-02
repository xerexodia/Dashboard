import React, { useEffect, useState } from 'react';
import 'styles/userDetails.scss';
import 'styles/headerDash.scss';

import { useNavigate, useParams } from 'react-router-dom';
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
import { ToastContainer, toast } from 'react-toastify';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { url } from 'constants/urls';
import Spinner from 'components/Spinner';
import axios from 'axios';
import { trans } from 'utils/helpers';
// =========
const UserDetails = () => {
    const [update, setUpdate] = useState(false);
    const [user, setUser] = useState([]);
    const [machine, setMachines] = useState([]);
    const [informerModal, setInformerModal] = useState(false);
    const [machineModal, setMachineModal] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const navigate = useNavigate();
    console.log(user);

    // user id
    const { userId } = useParams();
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // ========================|| api calls || ================================//
    const getUser = async () => {
        setLoading(true);
        return await axios.get(`${url}Profile/User/${userId}`);
    };

    const deleteUser = async () => {
        await axios.delete(`${url}Profile/User/${userId}`);
        toast.success('user deleted successfully', {
            autoClose: 2000
        });
        navigate(-1);
    };

    useEffect(() => {
        getUser()
            .then((res) => {
                setUser(res.data), setMachines(res.data.clientMachines), setLoading(false);
            })
            .catch((err) => {
                console.log(err), setLoading(false);
            });
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Loading ? (
                <Spinner />
            ) : (
                <>
                    <ToastContainer />
                    <div className="dash-header">
                        <span>Utilisateur Détail</span>
                    </div>
                    <div className="userDetails-header">
                        <div>
                            <span>id: {user.id}</span>
                            <span>email: {user.emailAddress}</span>
                            <span>telephone: {user.phoneNumber} </span>
                            <span>contracted: {trans(user.isContracted)} </span>
                            <span>admin: {trans(user.isAdmin)} </span>
                        </div>
                        <div>
                            <button onClick={() => setInformerModal(true)}>informer</button>
                            <button onClick={() => setUpdate(true)}>update</button>
                            <button onClick={deleteUser}>delete</button>
                        </div>
                        <Modal title="informer utilisateur" onClose={() => setInformerModal(false)} show={informerModal}>
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
                                    userName: user.userName,
                                    password: '',
                                    emailAddress: user.emailAddress,
                                    phoneNumber: user.phoneNumber,
                                    isAdmin: Boolean(user.isAdmin),
                                    isContracted: Boolean(user.isContracted)
                                }}
                                onSubmit={async () => {
                                    try {
                                        const data = await axios.patch(`${url}Profile/User/${userId}`);
                                        if (data) {
                                            setUser(data.data);
                                            setUpdate(false);
                                            toast.success('user updated successfully');
                                        }
                                    } catch (error) {
                                        console.log(error);
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
                                                        placeholder="Enter emailAddress address"
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
                                                        value={values.phoneNumber}
                                                        name="phoneNumber"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter phone number"
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
                                                                checked={values.isAdmin}
                                                                onChange={handleChange}
                                                                name="isAdmin"
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
                                                                checked={values.isContracted}
                                                                onChange={handleChange}
                                                                name="isContracted"
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
                                    machineType: '',
                                    sellDate: ''
                                }}
                                onSubmit={async (values) => {
                                    try {
                                        const data = await axios.post(`${url}Machine/AddMachine`, {
                                            userId,
                                            ...values
                                        });
                                        if (data) {
                                            setMachines((prev) => [...prev, data.data]);
                                            setMachineModal(false);
                                            toast.success('machine added successfully');
                                        }
                                    } catch (error) {
                                        console.log(error);
                                    }
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
                                                        value={values.machineType}
                                                        name="machineType"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter machine type"
                                                        fullWidth
                                                        error={Boolean(touched.machineType && errors.machineType)}
                                                    />
                                                    {touched.machineType && errors.machineType && (
                                                        <FormHelperText error id="standard-weight-helper-text-machineType-login">
                                                            {errors.machineType}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="sellDate">Sale date</InputLabel>
                                                    <OutlinedInput
                                                        id="sellDate"
                                                        type="text"
                                                        value={values.sellDate}
                                                        name="sellDate"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter sale date"
                                                        fullWidth
                                                        error={Boolean(touched.sellDate && errors.sellDate)}
                                                    />
                                                    {touched.sellDate && errors.sellDate && (
                                                        <FormHelperText error id="standard-weight-helper-text-sellDate-login">
                                                            {errors.sellDate}
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
                            {machine.length > 0 ? (
                                machine.map((item, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => navigate(`/dashboard/admin/users/${userId}/machine/${item.serialNumber}`)}
                                    >
                                        <span>#{item.serialNumber} </span>
                                        <span>{item.machineType}</span>
                                        <span>{item.userId}</span>
                                        <span>{item.sellDate}</span>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <span>user have not machines yet!...</span>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserDetails;
