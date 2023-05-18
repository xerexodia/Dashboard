import React, { useState } from 'react';
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

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// =========
const MachineDetails = () => {
    const [informerModal, setInformerModal] = React.useState(false);
    const [addVisitModal, setAddVisitModal] = React.useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <div className="dash-header">
                <span>Machine Détails</span>
            </div>
            <div className="machine-detail-box">
                <div>
                    <span>
                        Numéro de série: <span style={{ fontWeight: '500' }}>#qsdiuoyhsqdh421654</span>
                    </span>
                    <span>
                        id client: <span style={{ fontWeight: '500' }}>#542564dqs1</span>
                    </span>
                    <span>
                        type: <span style={{ fontWeight: '500' }}>dqsdqsd</span>
                    </span>
                    <span>
                        date de vente:<span style={{ fontWeight: '500' }}>27/12/2023</span>
                    </span>
                </div>
                <div>
                    <button onClick={() => setInformerModal(true)}>informer</button>
                    <button>delete</button>
                    <Modal title="notifier utilisateur" onClose={() => setInformerModal(false)} show={informerModal}>
                        <Formik
                            initialValues={{
                                etat: '',
                                message: '',
                                piece: ''
                            }}
                        >
                            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                                <form noValidate onSubmit={handleSubmit} style={{ padding: '20px 30px' }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel id="demo-multiple-name-label">Etat de machiine</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-name-label"
                                                    id="demo-multiple-name"
                                                    value={values.etat}
                                                    onChange={handleChange}
                                                    input={<OutlinedInput label="etat" name="etat" placeholder="sdqsd" />}
                                                >
                                                    <MenuItem value="finis">finis</MenuItem>
                                                    <MenuItem value="en Progress">en cours</MenuItem>
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
                </div>
            </div>
            <div className="dash-header">
                <span>liste visite</span>
                <button onClick={() => setAddVisitModal(true)}>ajouter</button>
                <Modal title="notifier utilisateur" onClose={() => setAddVisitModal(false)} show={addVisitModal}>
                    <Formik
                        initialValues={{
                            visitNumber: '',
                            visitDate: '',
                            repairType: '',
                            finalState: '',
                            pminvestFileNum: '',
                            pmReturnDate: '',
                            pmInterFileNumber: '',
                            comment: '',
                            cmEnterDate: '',
                            cmReturnDate: '',
                            cmInvestFileNumber: '',
                            cmInterFileNumber: '',
                            cmRepairType: '',
                            attachment: ''
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} style={{ padding: '10px 10px' }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                                                <div>
                                                    <InputLabel htmlFor="message">Visit number</InputLabel>
                                                    <OutlinedInput
                                                        id="visitNumber"
                                                        type="text"
                                                        value={values.visitNumber}
                                                        name="visitNumber"
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
                                                        value={values.visitDate}
                                                        name="visitDate"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter message"
                                                        fullWidth
                                                        error={Boolean(touched.visitDate && errors.visitDate)}
                                                    />
                                                    {touched.visitDate && errors.visitDate && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.visitDate}
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
                                                value={values.repairType}
                                                onChange={handleChange}
                                                input={<OutlinedInput label="repairType" name="repairType" placeholder="sdqsd" />}
                                            >
                                                <MenuItem value="finis">finis</MenuItem>
                                                <MenuItem value="en Progress">en cours</MenuItem>
                                            </Select>
                                            {touched.repairType && errors.repairType && (
                                                <FormHelperText error id="standard-weight-helper-text-repairType-login">
                                                    {errors.repairType}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                                                <div>
                                                    <InputLabel htmlFor="message">pminvestFileNum</InputLabel>
                                                    <OutlinedInput
                                                        id="pminvestFileNum"
                                                        type="text"
                                                        value={values.pminvestFileNum}
                                                        name="pminvestFileNum"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter visit number"
                                                        fullWidth
                                                        error={Boolean(touched.pminvestFileNum && errors.pminvestFileNum)}
                                                    />
                                                    {touched.pminvestFileNum && errors.pminvestFileNum && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.pminvestFileNum}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="message">pmReturnDate</InputLabel>
                                                    <OutlinedInput
                                                        id="pmReturnDate"
                                                        type="text"
                                                        value={values.pmReturnDate}
                                                        name="pmReturnDate"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter"
                                                        fullWidth
                                                        error={Boolean(touched.pmReturnDate && errors.pmReturnDate)}
                                                    />
                                                    {touched.pmReturnDate && errors.pmReturnDate && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.pmReturnDate}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="message">pmInterFileNumber</InputLabel>
                                                    <OutlinedInput
                                                        id="pmInterFileNumber"
                                                        type="text"
                                                        value={values.pmInterFileNumber}
                                                        name="pmInterFileNumber"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter message"
                                                        fullWidth
                                                        error={Boolean(touched.pmInterFileNumber && errors.pmInterFileNumber)}
                                                    />
                                                    {touched.pmInterFileNumber && errors.pmInterFileNumber && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.pmInterFileNumber}
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
                                                        value={values.cmEnterDate}
                                                        name="cmEnterDate"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter visit number"
                                                        fullWidth
                                                        error={Boolean(touched.cmEnterDate && errors.cmEnterDate)}
                                                    />
                                                    {touched.cmEnterDate && errors.cmEnterDate && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.cmEnterDate}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="message">cmReturnDate</InputLabel>
                                                    <OutlinedInput
                                                        id="cmReturnDate"
                                                        type="text"
                                                        value={values.cmReturnDate}
                                                        name="cmReturnDate"
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
                                                    <InputLabel htmlFor="message">cmInvestFileNumber</InputLabel>
                                                    <OutlinedInput
                                                        id="cmInvestFileNumber"
                                                        type="text"
                                                        value={values.cmInvestFileNumber}
                                                        name="cmInvestFileNumber"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter visit number"
                                                        fullWidth
                                                        error={Boolean(touched.cmInvestFileNumber && errors.cmInvestFileNumber)}
                                                    />
                                                    {touched.cmInvestFileNumber && errors.cmInvestFileNumber && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.cmInvestFileNumber}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="message">cmInterFileNumber</InputLabel>
                                                    <OutlinedInput
                                                        id="cmInterFileNumber"
                                                        type="text"
                                                        value={values.cmInterFileNumber}
                                                        name="cmInterFileNumber"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter"
                                                        fullWidth
                                                        error={Boolean(touched.cmInterFileNumber && errors.cmInterFileNumber)}
                                                    />
                                                    {touched.cmInterFileNumber && errors.cmInterFileNumber && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.cmInterFileNumber}
                                                        </FormHelperText>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel htmlFor="message">cmRepairType</InputLabel>
                                                    <OutlinedInput
                                                        id="cmRepairType"
                                                        type="text"
                                                        value={values.cmRepairType}
                                                        name="cmRepairType"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Enter message"
                                                        fullWidth
                                                        error={Boolean(touched.cmRepairType && errors.cmRepairType)}
                                                    />
                                                    {touched.cmRepairType && errors.cmRepairType && (
                                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                                            {errors.cmRepairType}
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
                                                value={values.finalState}
                                                name="finalState"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="finalState jointe"
                                                fullWidth
                                                error={Boolean(touched.finalState && errors.finalState)}
                                            />
                                            {touched.finalState && errors.finalState && (
                                                <FormHelperText error id="standard-weight-helper-text-finalState-login">
                                                    {errors.finalState}
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
                                                value={values.comment}
                                                name="comment"
                                                multiline
                                                maxRows={4}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter comment"
                                                fullWidth
                                                error={Boolean(touched.comment && errors.comment)}
                                            />
                                            {touched.comment && errors.comment && (
                                                <FormHelperText error id="standard-weight-helper-text-comment-login">
                                                    {errors.comment}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack>
                                            <InputLabel htmlFor="piece">piece jointe</InputLabel>
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
            <div className="users-grid-data">
                <div>
                    <span>serial number</span>
                    <span>machine type</span>
                    <span>clientId</span>
                    <span>sale date</span>
                </div>
                <div className="users-grid-body">
                    <div onClick={() => navigate('/dashboard/admin/users/qsdsddqqsdsd/machine/qsdqsdqsd/visit/sdqsdqsd')}>
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

export default MachineDetails;
