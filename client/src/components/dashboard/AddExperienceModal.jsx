import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Avatar, TextField } from '@mui/material';
import { CheckBox, RemoveCircleOutline } from '@mui/icons-material';
import { useFormik } from 'formik';

export default function AddExperienceModal() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [checked, setChecked] = React.useState(false);
    const handleCheck = () => {
        setChecked(!checked);
    }

    const experienceForm = useFormik({
        initialValues: {
            company_name: "",
            company_logo: "",
            company_location: "",
            role: "",
            description: "",
            join_date: "",
            end_date: ""
        },
        onSubmit: () => {
            alert("Submitting")
        }
    })
    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Experience
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="add-experience-title"
            >
                <DialogTitle id="add-experience-title">
                    {"Add Experience"}
                </DialogTitle>
                <DialogContent>
                    <div className="row g-2">
                        <div className="col-12 col-lg-6">
                            <div className="d-flex align-items-start">
                                {experienceForm.values.company_logo ? <Avatar className='rounded' style={{ objectFit: "cover", border: "1px dotted grey me-2", height: 100, width: 100 }} alt="main"
                                    src={typeof (experienceForm.values.company_logo) == "string" ?
                                        experienceForm.values.company_logo :
                                        URL.createObjectURL(experienceForm.values.company_logo)} /> : ""}
                                <div className="d-flex align-items-center flex-wrap">
                                    <Button variant="contained" color='success' component="label" className='rounded-2 px-4 m-1 mt-0 text-capitalize'>
                                        {experienceForm.values.company_logo ? "Update" : "Upload Company Logo"}
                                        <input label={"Company logo"} type="file" onChange={(e) => experienceForm.setFieldValue("company_logo", e.target.files[0])} hidden accept="image/*" />
                                    </Button>
                                    {experienceForm.values.company_logo ?
                                        <Button onClick={() => experienceForm.setFieldValue("company_logo", "")} variant='contained' color='error' className='rounded-2 m-1'>
                                            <RemoveCircleOutline className='fs-6' />&nbsp;Remove
                                        </Button> : ""
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <TextField
                                label="Company Name"
                                name='company_name'
                                fullWidth
                            />
                        </div>
                        <div className="col-12">
                            <TextField
                                label="Location"
                                fullWidth
                            />
                        </div>
                        <div className="col-12">
                            <TextField
                                label="Your Role"
                                fullWidth
                            />
                        </div>
                        <div className="col-12">
                            <TextField
                                multiline
                                rows={5}
                                label="Describe Your Role"
                                fullWidth
                            />
                        </div>
                        <div className="col-12">
                            <span className="form-label text-dark mb-2">
                                Joining Date
                            </span>
                            <TextField
                                fullWidth
                                type='date'
                            />
                        </div>
                        <div className="col-12">
                            <span className="form-label text-dark mb-2">
                                End Date
                            </span>
                            <TextField
                                fullWidth
                                type='date'
                            />
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" for="flexCheckDefault">
                                    Present
                                </label>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='contained' color='success' onClick={handleClose} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}