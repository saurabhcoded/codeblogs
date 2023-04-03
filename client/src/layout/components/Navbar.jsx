import { useGlobalContext } from '@/context/globalContext'
import { Logout } from '@mui/icons-material'
import { Avatar, Button, IconButton } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Navbar = () => {
    const { user, logoutHandler } = useGlobalContext()
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <div className="container">
                <Link href="/" passHref className="navbar-brand">
                    <div className="d-flex align-items-center">
                        <Image src={"/images/logo.webp"} height={80} width={80} />
                        <h3 className="fw-bold lh-1">
                            CODE <br />
                            BLOGS
                        </h3>
                    </div>
                </Link>
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
                            <Link href="/about" className="nav-link">About Us</Link>
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
                                            <Avatar src={user?.profile} alt={user?.name}></Avatar>
                                        </IconButton>
                                        <ul className="dropdown-menu p-2" style={{ minWidth: 250 }}>
                                            <li>
                                                <div className="dropdown-item bg-white">
                                                    <span className="text-success fw-bold fs-5">Welcome,</span> <br /> {user?.name}
                                                </div>
                                            </li>
                                            {
                                                user?.role !== "reader" &&
                                                <>
                                                    <li>
                                                        <Link href={"/dashboard"} className='dropdown-item py-2'>My Dashboard</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={"/dashboard/add"} className='dropdown-item py-2'>Add Blogs</Link>
                                                    </li>
                                                </>
                                            }

                                            <li>
                                                <Button onClick={logoutHandler} color='error' className='dropdown-item py-2 rounded-0 text-danger text-capitalize'><Logout sx={{ color: "tomato", fontSize: 20 }} /> Log Out</Button>
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