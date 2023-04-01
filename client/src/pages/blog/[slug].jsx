import { Avatar } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const SingleBlog = () => {
    return (
        <div className='container py-4'>
            <div className="row g-2">
                <div className="col-12 col-lg-8">
                    <div style={{ position: "relative", height: 400 }}>
                        <Image src="/images/blogs/blog1.jpg" alt="blog" fill />
                    </div>
                    <div className='py-3'>
                        <h1>How Codeblogs has beaten the blog giant medium</h1>
                        <p>
                            <small>updated 13 min ago</small>
                        </p>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="card text-center mx-auto rounded-4" style={{ width: '18rem' }}>
                        <div className='pt-4'>
                            <Avatar className="mx-auto rounded" sx={{ height: 150, width: 150 }}></Avatar>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Saurabh Sharma</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleBlog