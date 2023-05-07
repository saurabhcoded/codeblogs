import { useGlobalContext } from '@/context/globalContext';
import * as yup from 'yup';
import useApi from '@/lib/useApi';
import useCurrentLocation from '@/lib/useLocation';
import { Delete, LocationCityTwoTone, LocationOn, Remove, RemoveCircleOutlineSharp } from '@mui/icons-material'
import { Avatar, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';

const validationSchema = new yup.object({
    profile: yup.mixed().required("profile picture is required"),
    name: yup.string().max(100).required("Full Name is Required"),
    email: yup.string().email().required("Email is required"),
    phone: yup
        .string()
        .required("Phone Number is Required")
        .matches(/^[0-9]{10}$/, "Invalid Phone Number"),
    password: yup
        .string()
        .required("Password is required")
        .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
        .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
        .matches(/^(?=.*[0-9])/, "Must Contain One Numeric")
        .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain One special case Character")
        .matches(/^(?=.{10,})/, "Must Contain 10 Characters"),
    confirm_password: yup.string().oneOf([yup.ref("password"), null], "Password must match"),
    role: yup.string().required("Role is Required"),
    address: yup.string().min(50).required("Address is Required"),
});

const Register = () => {
    const ENDPOINT = useApi();
    const router = useRouter();
    const { user, setUser, token, setToken } = useGlobalContext();
    const currentLocation = useCurrentLocation();
    //Check for user Loggedin Or Not
    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user]);
    //Register Form
    const registerForm = useFormik({
        initialValues: {
            profile: "",
            name: "",
            email: "",
            phone: "",
            password: "",
            confirm_password: "",
            role: "author",
            address: ""
        },
        validationSchema,
        onSubmit: async (values, action) => {
            try {
                toast.dismiss();
                toast.loading("Creating Your Account");
                const response = await ENDPOINT.formdata.post("/auth/register", values)
                switch (response?.data?.status) {
                    case "success":
                        toast.dismiss();
                        toast.success("Registered Successfully");
                        setUser(response?.data?.user);
                        setToken(response?.data?.jwt);
                        break;
                    case "error":
                        toast.dismiss();
                        toast.error(response?.data?.message)
                        break;
                    case "warning":
                        toast.dismiss();
                        toast.error(response?.data?.message)
                        break;
                    default:
                        break;
                }
            } catch (error) {
                let msg = error?.response?.data?.message ? error?.response?.data?.message : "Oops Something Went Wrong!"
                toast.dismiss();
                toast.error(msg);
            }
        }
    });
    console.log(registerForm?.errors)
    useEffect(() => {
        if (currentLocation.currentAddress) {
            registerForm.setFieldValue("address", currentLocation.currentAddress)
        }
    }, [currentLocation.currentAddress])
    return (
        <div className='py-4 bg-light'>
            <div className="row g-0 justify-content-center align-items-center h-100">
                <div className="col-12 col-lg-4">
                    <div className='rounded border bg-white shadow mx-auto p-3 p-lg-4'>
                        <h4 className='fw-bold text-center fs-3'>
                            Register Form
                        </h4>
                        {/* simple login  */}
                        <form onSubmit={registerForm.handleSubmit} className='row g-3 mt-1'>
                            <div className="form-group col-12">
                                <h5 className='fw-semibold'>Profile Picture</h5>
                                <div className="d-flex align-items-center justify-content-start">
                                    <Avatar sx={{ height: 80, width: 80 }} className='rounded' alt="Cindy Baker" src={registerForm.values.profile ? URL.createObjectURL(registerForm.values.profile) : ""} />
                                    <div className="d-flex ms-2">
                                        <Button variant="contained" component="label" className='rounded-2 px-4 py-2'>
                                            {registerForm.values.profile ? "Update" : "Upload"}
                                            <input label={"profile"} type="file" onChange={(e) => registerForm.setFieldValue("profile", e.target.files[0])} hidden accept="image/*" />
                                        </Button>
                                        {registerForm.values.profile ?
                                            <Button onClick={() => registerForm.setFieldValue("profile", "")} variant='contained' color='error' className='rounded-2 ms-2'>
                                                <RemoveCircleOutlineSharp className='fs-6' />&nbsp;Remove
                                            </Button> : ""
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-12">
                                <TextField label={"Full Name"} fullWidth id='name' name='name' onChange={registerForm.handleChange} value={registerForm.values.name} type="text" error={registerForm.touched.name && registerForm.errors.name} helperText={registerForm.touched.name && registerForm.errors.name} />
                            </div>
                            <div className="form-group col-12 col-lg-6">
                                <TextField label={"Email Address"} fullWidth id='email' name='email' onChange={registerForm.handleChange} value={registerForm.values.email} type="text" error={registerForm.touched.email && registerForm.errors.email} helperText={registerForm.touched.email && registerForm.errors.email} />
                            </div>
                            <div className="form-group col-12 col-lg-6">
                                <label htmlFor="phone" className="form-label"></label>
                                <TextField label={"Contact Number"} id='phone' name='phone' onChange={registerForm.handleChange} value={registerForm.values.phone} type="text" fullWidth error={registerForm.touched.phone && registerForm.errors.phone} helperText={registerForm.touched.phone && registerForm.errors.phone} />
                            </div>
                            <div className="form-group col-6">
                                <TextField label={"Password"}  type={"password"} id='password' name='password' onChange={registerForm.handleChange} value={registerForm.values.password} fullWidth error={registerForm.touched.password && registerForm.errors.password} helperText={registerForm.touched.password && registerForm.errors.password} />
                            </div>
                            <div className="form-group col-6">
                                <TextField label={"Confirm Password"} type={"password"} id='confirm_password' name='confirm_password' onChange={registerForm.handleChange} value={registerForm.values.confirm_password} t fullWidth error={registerForm.touched.confirm_password && registerForm.errors.confirm_password} helperText={registerForm.touched.confirm_password && registerForm.errors.confirm_password} />
                            </div>
                            <div className="form-group mb-2">
                                <TextField label={"Address"} size={"small"} fullWidth multiline rows={3} id='address' name='address' type="text" onChange={registerForm.handleChange} value={registerForm?.values.address} error={registerForm.touched.address && registerForm.errors.address} helperText={registerForm.touched.address && registerForm.errors.address} />
                            </div>
                            <div className='mt-3'>
                                <Button variant='contained' type='submit' color={registerForm.isSubmitting ? "success" : "primary"} fullWidth className={`rounded text-capitalize py-3 fs-5`} disabled={registerForm.isSubmitting}>
                                    {registerForm.isSubmitting ?
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        "Register"
                                    }

                                </Button>
                            </div>
                        </form>
                        {/* login with google  */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register