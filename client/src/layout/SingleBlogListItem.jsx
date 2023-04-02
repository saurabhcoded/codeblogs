import { Button } from '@mui/material'
import moment from 'moment/moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SingleBlogListItem = ({ blog }) => {
    return (
        <div className="card p-3 rounded-3 shadow">
            <Image src={blog?.img} width={500}
                height={300} className="img-fluid rounded border" alt="..." style={{ maxHeight: 300, objectFit: "cover" }} />
            <div className="card-body px-0">
                <h5 className="card-title fw-bold">{blog?.title}</h5>
                <p className="card-text">{blog?.description}</p>
                <p className="card-text"><small className="text-body-secondary">Last updated {moment(blog?.updated_at).fromNow()}</small></p>
                <Link href={"/blog/"+blog?.slug} className='rounded text-capitalize'>Read Blog</Link>
            </div>
        </div>
    )
}

export default SingleBlogListItem