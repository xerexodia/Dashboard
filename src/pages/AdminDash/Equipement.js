import React, { useState } from 'react';
import 'styles/userDetails.scss';
import 'styles/headerDash.scss';
import { DeleteOutlined } from '@ant-design/icons';
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
import { set } from 'lodash';
const Equipement = () => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <div className="dash-header">
                <span>Liste des équipement</span>
                <button onClick={() => setShow(true)}>ajouter</button>
                <Modal title="notifier utilisateur" onClose={() => setShow(false)} show={show}>
                    <Formik
                        initialValues={{
                            title: '',
                            detail: '',
                            prix: '',
                            piece: ''
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} style={{ padding: '20px 30px' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="title">nom</InputLabel>
                                            <OutlinedInput
                                                id="title"
                                                type="text"
                                                value={values.title}
                                                name="title"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter title"
                                                fullWidth
                                                error={Boolean(touched.title && errors.title)}
                                            />
                                            {touched.title && errors.title && (
                                                <FormHelperText error id="standard-weight-helper-text-title-login">
                                                    {errors.title}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="detail">Description</InputLabel>
                                            <OutlinedInput
                                                id="detail"
                                                type="text"
                                                value={values.detail}
                                                name="detail"
                                                multiline
                                                maxRows={4}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter detail"
                                                fullWidth
                                                error={Boolean(touched.detail && errors.detail)}
                                            />
                                            {touched.detail && errors.detail && (
                                                <FormHelperText error id="standard-weight-helper-text-detail-login">
                                                    {errors.detail}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="prix">Prix</InputLabel>
                                            <OutlinedInput
                                                id="prix"
                                                type="text"
                                                value={values.prix}
                                                name="prix"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter prix"
                                                fullWidth
                                                error={Boolean(touched.prix && errors.prix)}
                                            />
                                            {touched.prix && errors.prix && (
                                                <FormHelperText error id="standard-weight-helper-text-prix-login">
                                                    {errors.prix}
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
            </div>
            <div className="grid-data">
                <div>
                    <span>id</span>
                    <span>nom</span>
                    <span>prix</span>
                    <span>detaails</span>
                    <span>Action</span>
                </div>
                <div className="grid-body">
                    <div>
                        <span>#21qsd654321dq</span>
                        <span>#qsdqsqsd6541d</span>
                        <span>#6+23qsd4qsqd</span>
                        <span>finished</span>
                        <span>
                            <DeleteOutlined />
                        </span>
                    </div>
                    <div>
                        <span>#21qsd654321dq</span>
                        <span>#qsdqsqsd6541d</span>
                        <span>#6+23qsd4qsqd</span>
                        <span>finished</span>
                        <span>
                            <DeleteOutlined />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Equipement;
