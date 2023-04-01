import { Link } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React from 'react'

const SingleBloggerListItem = () => {
    return (
        <div className='p-2 shadow-sm rounded w-100 border border-dark'>
            <div className="d-flex align-items-start">
                <div>
                    <Avatar className='rounded-2' />
                    <IconButton>
                        <Link />
                    </IconButton>
                </div>
                <div className='px-2'>
                    <h5 className='fw-semibold'>Saurabh Sharma</h5>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing...</p>
                </div>
            </div>
        </div>


    )
}

export default SingleBloggerListItem