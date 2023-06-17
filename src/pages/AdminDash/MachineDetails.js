import React, { useEffect, useRef, useState } from 'react';
import 'styles/userDetails.scss';
import 'styles/headerDash.scss';
import 'styles/machineDetails.scss';

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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { url } from 'constants/urls';

// =========
const MachineDetails = () => {
    const [informerModal, setInformerModal] = React.useState(false);
    const [addVisitModal, setAddVisitModal] = React.useState(false);
    const [machine, setMachine] = useState({});
    const [visits, setVisits] = useState([]);
    const [dateFilter, setDateFilter] = useState('');

    const [file, setFile] = useState();
    const inputRef = useRef();
    const navigate = useNavigate();
    const { machineId } = useParams();
    

    const [visit, setVisit] = useState({
        VisitNumber: '',
        VisitDate: '',
        RepaireType: '',
        FinalState: '',
        PmInvestigationFileNumber: '',
        PmReturnDate: '',
        PmInterventionFileNumber: '',
        Comment: '',
        CmEnterDate: '',
        CmInvestigationFileNumber: '',
        CmRepaireType: '',
        CmInterventionFileNumber: '',
        CmReturnDate: '',
        Attachment:'',
        AttachmentName:''
    });
    const { userId } = useParams();
    const { serialNumber } = useParams();
    const getMachine = async () => {
        return await axios.get(`${url}Machine/${machineId}/visits`);
    };
    const deleteMachine = async () => {
        await axios.delete(`${url}Machine/${machineId}`);
    };

    const addVisit = async (values) => {
        const formData = new FormData();
        for (let el of Object.keys(values)) {
            formData.append(el, values[el]);
        }

        formData.append('Attachment', file);
        formData.append('MachineSerialNumber', machine.serialNumber);
        formData.append('MachineType', machine.machineType);

        for (let el of formData) {
            console.log(el);
        }
        
        const data = await axios.post(`${url}VisitDetails/AddVisit`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        console.log(data);
        setVisits((prev) => [...prev, data.data]);
    };

    const addNotif = async (values) => {
        const formData = new FormData();
        for (let el of Object.keys(values)) {
            formData.append(el, values[el]);
        }

        formData.append('Attachment', file);
        formData.append('MachineSerialNumber', machine.serialNumber);
        formData.append('MachineType', machine.machineType);

        for (let el of formData) {
            console.log(el);
        }
        const data = await axios.post(`${url}MachineStateNotification/AddMachineNotification`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(data);
        set
    };
    useEffect(() => {
        getMachine()
            .then((res) => {
                setMachine(res.data);
                setVisits(res.data?.visitDetails);
            })
            .catch((err) => console.log(err));
        console.log(machine);

        return () => {
            setMachine({});
            setVisits([]);
        };
    }, [machineId]);
    const filteredVisits = visits.filter((item) => {
        if (dateFilter === '') {
          return true; // No filter applied, include all visits
        } else {
          const formattedVisitDate = item.visitDate.toLowerCase(); // Adjust to match the format of your visit date
          const formattedDateFilter = dateFilter.toLowerCase(); // Adjust to match the format of your date filter
          return formattedVisitDate.includes(formattedDateFilter);
        }
      });

    return (
        <div>
            <div className="dash-header">
                <span>Machine Détails</span>
            </div>
            <div className="machine-detail-box">
                <div>
                    <span>
                        Numéro de série: <span style={{ fontWeight: '500' }}>#{machine.serialNumber}</span>
                    </span>
                    <span>
                        id client: <span style={{ fontWeight: '500' }}>#{machine.userId}</span>
                    </span>
                    <span>
                        type: <span style={{ fontWeight: '500' }}>{machine.machineType}</span>
                    </span>
                    <span>
                        date de vente:<span style={{ fontWeight: '500' }}>{machine.sellDate}</span>
                    </span>
                </div>
                <div>
                    <button onClick={() => setInformerModal(true)}>informer</button>
                    <button
                        onClick={() => {
                            deleteMachine();
                            navigate(-1);
                        }}
                    >
                        delete
                    </button>
                    <Modal title="notifier utilisateur" onClose={() => setInformerModal(false)} show={informerModal}>
                    <Formik
                            initialValues={{
                                MachineState: '',
                                Message: ''
                            }}
                            onSubmit={addNotif} ////////////
                            >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit} style={{ padding: '20px 30px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel id="demo-multiple-name-label">Etat de machine</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-name-label"
                                                    id="demo-multiple-name"
                                                    value={values.MachineState}
                                                    onChange={handleChange}
                                                    input={<OutlinedInput label="etat" name="MachineState" placeholder="sdqsd" />}
                                                >
                                                    <MenuItem value="Réception de l'endoscope">Réception de l'endoscope</MenuItem>
                                                    <MenuItem value="En cours d'investigation">En cours d'investigation</MenuItem>
                                                    <MenuItem value="en cours d'entretien">en cours d'entretien</MenuItem>
                                                    <MenuItem value="en cours de réparation">en cours de réparation</MenuItem>
                                                    <MenuItem value="Endoscope réparé">Endoscope réparé</MenuItem>
                                                    <MenuItem value="Livraison de l'endoscope">Livraison de l'endoscope</MenuItem>
                                                </Select>
                                                {touched.email && errors.email && (
                                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                                        {errors.email}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="message">Message</InputLabel>
                                                <OutlinedInput
                                                    id="message"
                                                    type="text"
                                                    value={values.Message}
                                                    name="Message"
                                                    multiline
                                                    maxRows={4}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Enter message"
                                                    fullWidth
                                                    error={Boolean(touched.Message && errors.Message)}
                                                />
                                                {touched.Message && errors.Message && (
                                                    <FormHelperText error id="standard-weight-helper-text-Message-login">
                                                        {errors.Message}
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
                                                    value={values.Attachment}
                                                    name="piece"
                                                    onBlur={handleBlur}
                                                    onChange={(e) => setFile(e.target.files[0])}
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
            </div>
            <div className="dash-header">
                <span>liste visites</span>
                <button onClick={() => setAddVisitModal(true)}>ajouter</button>
                <Modal title="add visit" onClose={() => setAddVisitModal(false)} show={addVisitModal}>
                    <Formik initialValues={visit} onSubmit={(values) => addVisit(values)}>
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form encType="multipart/form-data" noValidate onSubmit={handleSubmit} style={{ padding: '10px 10px' }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                                                <div>
                                                    <InputLabel htmlFor="message">Visit number</InputLabel>
                                                    <OutlinedInput
                                                        id="visitNumber"
                                                        type="text"
                                                        value={values.VisitNumber}
                                                        name="VisitNumber"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter visit number"
                                                        fullWidth
                                                        error={Boolean(touched.visitNumber && errors.visitNumber)}
                                                    />
                                                    {touched.visitNumber && errors.visitNumber && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.visitNumber}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="message">Visit Date</InputLabel>
                                                    <OutlinedInput
                                                        id="visitDate"
                                                        type="text"
                                                        value={values.VisitDate}
                                                        name="VisitDate"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter message"
                                                        fullWidth
                                                        error={Boolean(touched.VisitDate && errors.VisitDate)}
                                                    />
                                                    {touched.VisitDate && errors.VisitDate && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.VisitDate}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack>
                                            <InputLabel id="demo-multiple-name-label">type de réparation</InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                value={values.RepaireType}
                                                name="RepaireType"
                                                onChange={handleChange}
                                                input={<OutlinedInput label="repaireType" name="repaireType" placeholder="sdqsd" />}
                                            >
                                                <MenuItem value="finis">finis</MenuItem>
                                                <MenuItem value="en Progress">en cours</MenuItem>
                                            </Select>
                                            {touched.RepaireType && errors.RepaireType && (
                                                <FormHelperText error id="standard-weight-helper-text-RepaireType-login">
                                                    {errors.RepaireType}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                                                <div>
                                                    <InputLabel htmlFor="message">PmInvestigationFileNumber</InputLabel>
                                                    <OutlinedInput
                                                        id="pminvestFileNum"
                                                        type="text"
                                                        value={values.PmInvestigationFileNumber}
                                                        name="PmInvestigationFileNumber"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter visit number"
                                                        fullWidth
                                                        error={Boolean(
                                                            touched.PmInvestigationFileNumber && errors.PmInvestigationFileNumber
                                                        )}
                                                    />
                                                    {touched.PmInvestigationFileNumber && errors.PmInvestigationFileNumber && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.PmInvestigationFileNumber}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="message">pmReturnDate</InputLabel>
                                                    <OutlinedInput
                                                        id="pmReturnDate"
                                                        type="text"
                                                        value={values.PmReturnDate}
                                                        name="PmReturnDate"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter"
                                                        fullWidth
                                                        error={Boolean(touched.PmReturnDate && errors.PmReturnDate)}
                                                    />
                                                    {touched.PmReturnDate && errors.PmReturnDate && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.PmReturnDate}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="message">pmInterFileNumber</InputLabel>
                                                    <OutlinedInput
                                                        id="pmInterFileNumber"
                                                        type="text"
                                                        value={values.PmInterventionFileNumber}
                                                        name="PmInterventionFileNumber"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter message"
                                                        fullWidth
                                                        error={Boolean(touched.PmInterventionFileNumber && errors.PmInterventionFileNumber)}
                                                    />
                                                    {touched.PmInterventionFileNumber && errors.PmInterventionFileNumber && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.PmInterventionFileNumber}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                                                <div>
                                                    <InputLabel htmlFor="message">cmEnterDate</InputLabel>
                                                    <OutlinedInput
                                                        id="cmEnterDate"
                                                        type="text"
                                                        value={values.CmEnterDate}
                                                        name="CmEnterDate"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter visit number"
                                                        fullWidth
                                                        error={Boolean(touched.CmEnterDate && errors.CmEnterDate)}
                                                    />
                                                    {touched.CmEnterDate && errors.CmEnterDate && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.CmEnterDate}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="message">cmReturnDate</InputLabel>
                                                    <OutlinedInput
                                                        id="cmReturnDate"
                                                        type="text"
                                                        value={values.CmReturnDate}
                                                        name="CmReturnDate"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter"
                                                        fullWidth
                                                        error={Boolean(touched.cmReturnDate && errors.cmReturnDate)}
                                                    />
                                                    {touched.cmReturnDate && errors.cmReturnDate && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.cmReturnDate}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack>
                                            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                                                <div>
                                                    <InputLabel htmlFor="message">CmInterventionFileNumber</InputLabel>
                                                    <OutlinedInput
                                                        id="cmInvestFileNumber"
                                                        type="text"
                                                        value={values.CmInterventionFileNumber}
                                                        name="CmInterventionFileNumber"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter visit number"
                                                        fullWidth
                                                        error={Boolean(touched.CmInterventionFileNumber && errors.CmInterventionFileNumber)}
                                                    />
                                                    {touched.CmInterventionFileNumber && errors.CmInterventionFileNumber && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.CmInterventionFileNumber}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="message">CmInvestigationFileNumber</InputLabel>
                                                    <OutlinedInput
                                                        id="CmInvestigationFileNumber"
                                                        type="text"
                                                        value={values.CmInvestigationFileNumber}
                                                        name="CmInvestigationFileNumber"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter"
                                                        fullWidth
                                                        error={Boolean(
                                                            touched.CmInvestigationFileNumber && errors.CmInvestigationFileNumber
                                                        )}
                                                    />
                                                    {touched.CmInvestigationFileNumber && errors.CmInvestigationFileNumber && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.CmInvestigationFileNumber}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="message">cmRepaireType</InputLabel>
                                                    <OutlinedInput
                                                        id="cmRepairType"
                                                        type="text"
                                                        value={values.CmRepaireType}
                                                        name="CmRepaireType"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter message"
                                                        fullWidth
                                                        error={Boolean(touched.CmRepaireType && errors.CmRepaireType)}
                                                    />
                                                    {touched.CmRepaireType && errors.CmRepaireType && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.CmRepaireType}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack>
                                            <InputLabel htmlFor="finalState">Etat finale</InputLabel>
                                            <OutlinedInput
                                                id="finalState"
                                                type="text"
                                                value={values.FinalState}
                                                name="FinalState"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="FinalState jointe"
                                                fullWidth
                                                error={Boolean(touched.FinalState && errors.FinalState)}
                                            />
                                            {touched.FinalState && errors.FinalState && (
                                                <FormHelperText error id="standard-weight-helper-text-FinalState-login">
                                                    {errors.FinalState}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack>
                                            <InputLabel htmlFor="comment">Commentaire:</InputLabel>
                                            <OutlinedInput
                                                id="comment"
                                                type="text"
                                                value={values.Comment}
                                                name="Comment"
                                                multiline
                                                maxRows={4}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter Comment"
                                                fullWidth
                                                error={Boolean(touched.Comment && errors.Comment)}
                                            />
                                            {touched.Comment && errors.Comment && (
                                                <FormHelperText error id="standard-weight-helper-text-Comment-login">
                                                    {errors.Comment}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack>
                                            <InputLabel htmlFor="piece">piece jointe</InputLabel>
                                            <OutlinedInput
                                            ref={inputRef}
                                            id="piece"
                                            type="file"
                                            value={values.Attachment}
                                            name="Attachment"
                                            onBlur={handleBlur}
                                            onChange={(e) => setFile(e.target.files[0])} // Update this line
                                            placeholder="Attachment jointe"
                                            fullWidth
                                            error={Boolean(touched.Attachment && errors.Attachment)}
                                            />


                                            {touched.Attachment && errors.Attachment && (
                                                <FormHelperText error id="standard-weight-helper-text-Attachment-login">
                                                    {errors.Attachment}
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
                                                Ajouter visite
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Modal>
            </div>
            <div>
            <Stack direction="row" spacing={2} alignItems="center">
                <InputLabel>Date Filter:</InputLabel>
                <OutlinedInput
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                placeholder="Enter visit date"
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton onClick={() => setDateFilter('')} edge="end">
                        X
                    </IconButton>
                    </InputAdornment>
                }
                />
            </Stack>
            <div className="users-grid-data">
                <div>
                <span>id</span>
                <span>final state</span>
                <span>RepaireType</span>
                <span>visit date</span>
                </div>
            </div>
            <div className="users-grid-body">
                {filteredVisits.length > 0 ? (
                filteredVisits.map((item, idx) => (
                    <div
                    key={idx}
                    onClick={() =>
                        navigate(
                        `/dashboard/admin/users/${userId}/machine/${serialNumber}/visit/${item.id}`
                        )
                    }
                    >
                    <span>#{item.id}</span>
                    <span>{item.finalState}</span>
                    <span>#{item.repaireType}</span>
                    <span>{item.visitDate}</span>
                    </div>
                ))
                ) : (
                <span>No visits found with the specified date filter.</span>
                )}
            </div>
            </div>

            </div>

    );
};

export default MachineDetails;
