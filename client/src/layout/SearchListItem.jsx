import { CalendarMonth, Person } from '@mui/icons-material'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'

const SearchListItem = ({ blog }) => {
    return (
        <Link passHref href={"/blog/"+blog.slug}>
            <div className='py-2'>
                <div className='row g-2 align-items-center'>
                    <div className="col">
                        <img src={blog?.img} alt={blog?.title} className="rounded w-100 d-block" style={{ height: 70, width: 60, objectFit: "cover" }} />
                    </div>
                    <div className="col-8">
                        <h6 className='fw-semibold mb-0 line-clamp-2 text-dark'>{blog?.title}</h6>
                        <small className='text-secondary fw-semibold'>
                            <CalendarMonth className="fs-6" /> {moment(blog?.created_at).calendar()}
                        </small>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SearchListItem