import { useGlobalContext } from '@/context/globalContext';
import useApi from '@/lib/useApi'
import { useFormik } from 'formik'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';

const Login = () => {
    const ENDPOINT = useApi();
    const router = useRouter();
    const { user, setUser, token, setToken } = useGlobalContext();
    //Check for user Loggedin Or Not
    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user]);
    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values, action) => {
            try {
                toast.dismiss();
                toast.loading("Signing you in");
                const response = await ENDPOINT.json.post("/auth/login", values)
                switch (response?.data?.status) {
                    case "success":
                        toast.dismiss();
                        toast.success("Logged In Successfully");
                        setUser(response?.data?.user);
                        setToken(response?.data?.jwt);
                        break;
                    case "error":
                        toast.dismiss();
                        toast.error(response?.data?.message);
                        break;
                    case "warning":
                        toast.dismiss();
                        toast.error(response?.data?.message);
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
    })
    return (
        <div className='py-5'>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div style={{ maxWidth: "25rem" }} className='border rounded mx-auto p-3 p-lg-4'>
                        <h4 className='fw-bold'>Login to codeblogs</h4>
                        <hr />
                        {/* simple login  */}
                        <form onSubmit={loginForm.handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input id='email' name='email' value={loginForm.values.email} onChange={loginForm.handleChange} type="text" className="form-control form-control-lg" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">Password</label>
                                <input id='password' name='password' type="text" value={loginForm.values.password} onChange={loginForm.handleChange} className="form-control form-control-lg" />
                            </div>
                            <div>
                                <button type='submit' disabled={loginForm.isSubmitting} className={`btn ${loginForm.isSubmitting ? "btn-success" : "btn-dark"} w-100 py-3`}>
                                    {loginForm.isSubmitting ?
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        "Login"
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

export default Login