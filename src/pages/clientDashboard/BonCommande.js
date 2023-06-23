import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// material-ui
import {
  Button,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { url } from 'constants/urls';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { useStateContext } from 'context/authContext';
import MainCard from 'components/MainCard';

const BonCommande = () => {
  const { user } = useStateContext();
  const [attachment, setAttachment] = useState(null);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('message', values.message);
      formData.append('attachment', attachment);

      // Make API call to send purchase order
      const response = await axios.post(
        `${url}MyPurchaseOrder/SendPurchaseOrder?clientId=${user.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Add this header for file uploads
          },
        }
      );

      // Check the response and show toast message accordingly
      if (response.status === 200) {
        toast.success('Purchase order sent successfully');
      } else {
        toast.error('Error sending purchase order');
      }
    } catch (error) {
      toast.error('Error sending purchase order');
    }
  };

  const handleAttachmentChange = (event) => {
    const file = event.target.files[0];
    setAttachment(file);
  };

  return (
    <>
      <div className="dash-header">
        <span>Bon de commande</span>
      </div>
      <div style={{ paddingTop: 100 }} />
      <MainCard>
        <Formik
          initialValues={{
            message: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            message: Yup.string().required('Message is required'),
          })}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="message-login">Message</InputLabel>
                    <OutlinedInput
                      id="message-login"
                      type="text"
                      value={values.message}
                      name="message"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter Message"
                      fullWidth
                      error={Boolean(touched.message && errors.message)}
                    />
                    {touched.message && errors.message && (
                      <FormHelperText error id="standard-weight-helper-text-message-login">
                        {errors.message}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="attachment-login">File</InputLabel>
                    <input
                      type="file"
                      id="attachment-login"
                      name="attachment"
                      onBlur={handleBlur}
                      onChange={handleAttachmentChange}
                    />
                    {touched.attachment && errors.attachment && (
                      <FormHelperText error id="standard-weight-helper-text-attachment-login">
                        {errors.attachment}
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
                      Envoyer bon de commande
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </MainCard>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default BonCommande;
