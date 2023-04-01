import React from 'react'

const Blog = () => {
    return (
        <div className='py-5'>
            <div className="d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div style={{ maxWidth: "25rem" }} className='border rounded mx-auto p-3 p-lg-4'>
                        <h4 className='fw-bold'>Login to codeblogs</h4>
                        <hr />
                        {/* simple login  */}
                        <form>
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input id='email' name='email' type="text" className="form-control form-control-lg" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">Password</label>
                                <input id='password' name='password' type="text" className="form-control form-control-lg" />
                            </div>
                            <div>
                                <button className="btn btn-dark w-100 py-3">Login</button>
                            </div>
                        </form>
                        {/* login with google  */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog