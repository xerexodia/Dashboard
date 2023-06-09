import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { url } from 'constants/urls';
import Spinner from 'components/Spinner';

const Equipement = () => {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const getData = async () => {
        setLoading(true);
        return await axios.get(`${url}GalleryMachine/MachinesGallery`);
    };
    console.log(data);
    useEffect(() => {
        getData()
            .then((res) => {
                setData(res.data), setLoading(false);
            })
            .catch((err) => {
                console.log(err), setLoading(false);
            });

        return () => {
            setData([]);
        };
    }, []);

    return (
        <div>
            {/* <img src={file} alt="" style={{ width: 60, height: 60 }} /> */}
            <div className="dash-header">
                <span>Liste des équipement</span>
                <button onClick={() => setShow(true)}>ajouter</button>
                <Modal title="notifier utilisateur" onClose={() => setShow(false)} show={show}>
                    <Formik
                        initialValues={{
                            Title: '',
                            Description: '',
                            Category: '',
                            Attachment: ''
                        }}
                        onSubmit={async (values) => {
                            console.log(values);
                            try {
                                let formData = new FormData();
                                for (let el of Object.keys(values)) {
                                    formData.append(el, values[el]);
                                }
                                formData.append('Attachment', file);
                                for (let el of formData) {
                                    console.log(el);
                                }
                                const equip = await axios.post(`${url}GalleryMachine/AddGallery`, formData, {
                                    headers: { 'Content-Type': 'multipart/form-data' }
                                });
                                console.log(equip);
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
                                            <InputLabel htmlFor="title">nom</InputLabel>
                                            <OutlinedInput
                                                id="Title"
                                                type="text"
                                                value={values.Title}
                                                name="Title"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter Title"
                                                fullWidth
                                                error={Boolean(touched.Title && errors.Title)}
                                            />
                                            {touched.Title && errors.Title && (
                                                <FormHelperText error id="standard-weight-helper-text-Title-login">
                                                    {errors.Title}
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
                                                value={values.Description}
                                                name="Description"
                                                multiline
                                                maxRows={4}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter Description"
                                                fullWidth
                                                error={Boolean(touched.Description && errors.Description)}
                                            />
                                            {touched.Description && errors.Description && (
                                                <FormHelperText error id="standard-weight-helper-text-Description-login">
                                                    {errors.Description}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="prix">Category</InputLabel>
                                            <OutlinedInput
                                                id="Category"
                                                type="text"
                                                value={values.Category}
                                                name="Category"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter Category"
                                                fullWidth
                                                error={Boolean(touched.Category && errors.Category)}
                                            />
                                            {touched.Category && errors.Category && (
                                                <FormHelperText error id="standard-weight-helper-text-Category-login">
                                                    {errors.Category}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="piece">Piece lointe</InputLabel>
                                            <OutlinedInput
                                                id="Attachment"
                                                type="file"
                                                value={values.Attachment}
                                                name="Attachment"
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    setFile(URL.createObjectURL(e.target.files[0])), handleChange('Attachment');
                                                }}
                                                placeholder="piece jointe"
                                                fullWidth
                                                error={Boolean(touched.Attachement && errors.Attachement)}
                                            />
                                            {touched.Attachement && errors.Attachement && (
                                                <FormHelperText error id="standard-weight-helper-text-Attachement-login">
                                                    {errors.Attachement}
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
                    <span>title</span>
                    <span>description</span>
                    <span>category</span>
                    <span>Action</span>
                </div>
                <div className="grid-body">
                    {loading ? (
                        <Spinner />
                    ) : data.length < 0 ? (
                        <span>no euipement to display for now</span>
                    ) : (
                        data.map((item, idx) => (
                            <div key={idx}>
                                <span>#{item.id}</span>
                                <span>{item.title}</span>
                                <span>{item.description}</span>
                                <span>{item.category}</span>
                                <span>
                                    <DeleteOutlined />
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Equipement;
