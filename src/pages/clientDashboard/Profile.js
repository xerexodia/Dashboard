import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Modal,
} from '@mui/material';
import { Formik } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateContext } from 'context/authContext';
import { url } from 'constants/urls';
import AnimateButton from 'components/@extended/AnimateButton';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const Profile = () => {
  const { user, setUser } = useStateContext();
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false); // State to control the modal

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const openUpdateModal = () => {
    setOpenModal(true); // Open the update modal
  };

  const closeUpdateModal = () => {
    setOpenModal(false); // Close the update modal
  };

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
          padding: 20,
        }}
      >
        <span>email: {user.emailAddress}</span>
        <span>nom: {user.userName}</span>
        <span>téléphone: {user.phoneNumber}</span>
        <span>contracté: {user.isContracted ? 'Oui' : 'Non'}</span>
        <Button variant="contained" color="primary" onClick={openUpdateModal}>
          Modifier
        </Button>
      </div>

      <ToastContainer />

      <Modal
        open={openModal}
        onClose={closeUpdateModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            width: '40%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            Update Profile
          </Typography>

          <Formik
            initialValues={{
              userName: '',
              password: '',
              emailAddress: '',
              phoneNumber: '',
            }}
            
            onSubmit={async (values) => {
              const updatedData = { id: user.id };

              if (values.emailAddress) {
                updatedData.emailAddress = values.emailAddress;
              }

              if (values.userName) {
                updatedData.userName = values.userName;
              }

              if (values.phoneNumber) {
                updatedData.phoneNumber = values.phoneNumber;
              }

              if (values.password) {
                updatedData.password = values.password;
              }

              try {
                const { data } = await axios.patch(`${url}MyProfile/MyProfile?clientId=${user.id}`,
                {
                  userName: values.userName,
                  emailAddress: values.emailAddress,
                  password: values.password,
                  phoneNumber: values.phoneNumber,
                },
                {
                  headers: {
                    'Content-Type': 'application/json-patch+json',
                    Accept: '*/*',
                  },
                }
              );
              if (data) {
                setUser(data);
                toast.success('User updated successfully');
                closeUpdateModal(); 
              }
            } catch (error) {
              console.log(error);
            }}
            }

          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit} style={{ padding: '20px 30px' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.emailAddress && errors.emailAddress)}>
                      <InputLabel htmlFor="email-login">Addresse email</InputLabel>
                      <OutlinedInput
                        id="email-login"
                        type="email"
                        value={values.emailAddress}
                        name="emailAddress"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        error={Boolean(touched.emailAddress && errors.emailAddress)}
                      />
                      {touched.emailAddress && errors.emailAddress && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.emailAddress}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.userName && errors.userName)}>
                      <InputLabel htmlFor="user-name">nom</InputLabel>
                      <OutlinedInput
                        id="user-name"
                        type="text"
                        value={values.userName}
                        name="userName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter user name"
                        error={Boolean(touched.userName && errors.userName)}
                      />
                      {touched.userName && errors.userName && (
                        <FormHelperText error id="standard-weight-helper-text-userName-login">
                          {errors.userName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.phoneNumber && errors.phoneNumber)}>
                      <InputLabel htmlFor="phone-number">téléphone</InputLabel>
                      <OutlinedInput
                        id="phone-number"
                        type="text"
                        value={values.phoneNumber}
                        name="phoneNumber"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      />
                      {touched.phoneNumber && errors.phoneNumber && (
                        <FormHelperText error id="standard-weight-helper-text-phoneNumber-login">
                          {errors.phoneNumber}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                      <InputLabel htmlFor="password-login">mot de passe</InputLabel>
                      <OutlinedInput
                        fullWidth
                        id="password-login"
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={(event) => event.preventDefault()}
                              edge="end"
                              size="large"
                            >
                              {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </IconButton>
                          </InputAdornment>
                        }
                        error={Boolean(touched.password && errors.password)}
                      />
                      {touched.password && errors.password && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.password}
                        </FormHelperText>
                      )}
                    </FormControl>
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
                        Modifier
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default Profile;
