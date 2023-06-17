import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
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

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { url } from 'constants/urls';
import { useStateContext } from 'context/authContext';
import { useNavigate } from 'react-router-dom';
import MainCard from 'components/MainCard';

const BonCommande = () => {
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
                        attachment: '',
                        submit: null
                    }}
                    onSubmit={async (values) => {
                        console.log(values);
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="message-login">Message</InputLabel>
                                        <OutlinedInput
                                            id="message-login"
                                            type="message"
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
                                        <InputLabel htmlFor="attachment-login">attachment</InputLabel>
                                        <OutlinedInput
                                            type="file"
                                            fullWidth
                                            error={Boolean(touched.attachment && errors.attachment)}
                                            id="-attachment-login"
                                            value={values.attachment}
                                            name="attachment"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="Enter attachment"
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
        </>
    );
};

export default BonCommande;
