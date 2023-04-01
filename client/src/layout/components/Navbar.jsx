import { useGlobalContext } from '@/context/globalContext'
import { Avatar, Button, IconButton } from '@mui/material'
import Link from 'next/link'
import React from 'react'


const Navbar = () => {
    const { user, logoutHandler } = useGlobalContext()
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">CodeBlogs</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-white">
                        <li className="nav-item">
                            <Link href="/" className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/blog" className="nav-link">Blogs</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/aboutus" className="nav-link">About Us</Link>
                        </li>
                    </ul>
                    <div className='d-flex align-items-center justify-content-end'>
                        {
                            user ?
                                <>
                                    <div className="btn-group dropstart">
                                        {/* <button type="button" className="btn btn-secondary dropdown-toggle" >
                                            Dropstart
                                        </button> */}
                                        <IconButton data-bs-toggle="dropdown" aria-expanded="false">
                                            <Avatar></Avatar>
                                        </IconButton>
                                        <ul className="dropdown-menu p-3" style={{ minWidth: 250 }}>
                                            <li>
                                                <span className="text-success fw-bold fs-5">Welcome,</span>  <br /> {user?.name}
                                            </li>
                                            <li >
                                                <Link href={"/dashboard"} className='dropdown-item text-center py-2'>My Dashboard</Link>
                                            </li>
                                            <li>
                                                <Link href={"/blog/add"} className='dropdown-item text-center py-2'>Add Blogs</Link>
                                            </li>
                                            <li className='mt-2'>
                                                <Button variant='contained' onClick={logoutHandler} color='error' fullWidth className='rounded'>Log Out</Button>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                                :
                                <>
                                    <Link href={"/auth/login"} passHref>
                                        <Button variant='contained' className='text-capitalize rounded me-2'>Login</Button>
                                    </Link>
                                    <Link href={"/auth/register"} passHref>
                                        <Button variant='contained' className='text-capitalize rounded'>Register</Button>
                                    </Link>
                                </>
                        }

                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar