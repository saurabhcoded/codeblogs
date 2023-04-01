import { LocationCityTwoTone, LocationOn } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

const Register = () => {
    return (
        <div className='py-5'>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div className='border rounded mx-auto p-3 p-lg-4'>
                        <h4 className='fw-bold'>Register to codeblogs</h4>
                        <hr />
                        {/* simple login  */}
                        <form>
                            <div className="form-group mb-2">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input id='email' name='email' type="text" className="form-control form-control-lg" />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="phone" className="form-label">Contact Number</label>
                                <input id='phone' name='phone' type="text" className="form-control form-control-lg" />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input id='password' name='password' type="text" className="form-control form-control-lg" />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                                <input id='confirm_password' name='confirm_password' type="text" className="form-control form-control-lg" />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="confirm_password" className="form-label">You are a</label>
                                <div className="row row-cols-l">
                                    <div className="col">
                                        <div className="form-check">
                                            <input className="form-check-input" value={"reader"} type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                            <label className="form-check-label" for="flexRadioDefault1">
                                                Reader
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-check">
                                            <input className="form-check-input" value={"blogger"} type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                                            <label className="form-check-label" for="flexRadioDefault2">
                                                Blogger
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="address" className="form-label">Address <Button variant='outlined' className='rounded text-capitalize'><LocationOn /> Current Location</Button></label>
                                <textarea id='address' name='address' type="text" className="form-control form-control-lg"></textarea>
                            </div>
                            <div className='mt-3'>
                                <button className="btn btn-dark w-100 py-3">Register</button>
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