import { Avatar, Button } from '@mui/material'
import moment from 'moment/moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SingleBlogListItem = ({ blog }) => {
    return (
        <div className="card p-0 rounded-3 shadow border-0">
            <Image src={blog?.img} width={500}
                height={300} className="img-fluid rounded border-0 w-100" alt="..." style={{ height: 300, objectFit: "cover" }} />
            <div className="card-body p-3">
                <h4 className="card-title fw-bold">{blog?.title}</h4>
                <p className="card-text">
                    <span className='line-clamp'>{blog?.description}</span>
                    <Link href={"/blog/" + blog?.slug} className='rounded text-capitalize'>Read Blog</Link></p>
                <p className="card-text">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <Avatar src={blog?.author?.profile} sx={{ height: 20, width: 20 }}></Avatar>&nbsp;{blog?.author?.name}
                        </div>
                        <small className="text-body-secondary">
                            Last updated {moment(blog?.updated_at).calendar()}
                        </small>
                    </div>
                </p>

            </div>
        </div>
    )
}

export default SingleBlogListItem