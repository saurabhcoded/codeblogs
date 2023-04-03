import { useGlobalContext } from '@/context/globalContext';
import useApi from '@/lib/useApi';
import { LocationCityTwoTone, LocationOn } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';

const Register = () => {
    const ENDPOINT = useApi();
    const router = useRouter();
    const { user, setUser, token, setToken } = useGlobalContext();
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
            role: "reader",
            address: ""
        },
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
    return (
        <div className='py-5'>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className='border rounded mx-auto p-3 p-lg-4'>
                        <h4 className='fw-bold'>Register to codeblogs</h4>
                        <hr />
                        {/* simple login  */}
                        <form onSubmit={registerForm.handleSubmit}>
                            <div className="form-group mb-2">
                                <label htmlFor="name" className="form-label">Profile Picture</label>
                                <input type="file" onChange={(e) => registerForm.setFieldValue("profile", e.target.files[0])} className="form-control form-control-lg" />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <input id='name' name='name' onChange={registerForm.handleChange} value={registerForm.values.name} type="text" className="form-control form-control-lg" />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input id='email' name='email' onChange={registerForm.handleChange} value={registerForm.values.email} type="text" className="form-control form-control-lg" />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="phone" className="form-label">Contact Number</label>
                                <input id='phone' name='phone' onChange={registerForm.handleChange} value={registerForm.values.phone} type="text" className="form-control form-control-lg" />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input id='password' name='password' onChange={registerForm.handleChange} value={registerForm.values.password} type="text" className="form-control form-control-lg" />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                                <input id='confirm_password' name='confirm_password' onChange={registerForm.handleChange} value={registerForm.values.confirm_password} type="text" className="form-control form-control-lg" />
                            </div>
                            <div className="form-group mb-2">
                                <span className="form-label">You are a</span>
                                <div className="row row-cols-l">
                                    <div className="col">
                                        <div className="form-check">
                                            <input className="form-check-input" onChange={registerForm.handleChange} value={"reader"} type="radio" id="role1" name="role" checked={registerForm.values.role === "reader"} />
                                            <label className="form-check-label" htmlFor="role1">
                                                Reader
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-check">
                                            <input className="form-check-input" onChange={registerForm.handleChange} value={"author"} type="radio" name="role" id="role2" checked={registerForm.values.role === "author"} />
                                            <label className="form-check-label" htmlFor="role2">
                                                Blogger
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="address" className="form-label">Address <Button variant='outlined' className='rounded text-capitalize'><LocationOn /> Current Location</Button></label>
                                <textarea id='address' name='address' type="text" onChange={registerForm.handleChange} className="form-control form-control-lg" defaultValue={registerForm?.values.address}></textarea>
                            </div>
                            <div className='mt-3'>
                                <button className={`btn ${registerForm.isSubmitting ? "btn-success" : "btn-dark"} w-100 py-3`} disabled={registerForm.isSubmitting}>
                                    {registerForm.isSubmitting ?
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        "Register"
                                    }

                                </button>
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