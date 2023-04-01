import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SingleBlogListItem = () => {
    return (
        <div className="card p-3 rounded-3 shadow">
            <div className="row g-0">
                <div className="col-md-4">
                    <Image src="/images/blogs/blog1.jpg" width={500}
                        height={500} className="img-fluid rounded" alt="..." style={{ maxHeight: 300, objectFit: "cover" }} />
                </div>
                <div className="col-md-8">
                    <div className="card-body py-lg-0">
                        <h4 className="card-title fw-bold">Medium is Dead due to it's paid version people switching to codeblogs</h4>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        <Link href={"/blog/single-blog"} className='rounded text-capitalize'>Read Blog</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleBlogListItem