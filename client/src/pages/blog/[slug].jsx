import { Person } from '@mui/icons-material';
import { Avatar } from '@mui/material'
import moment from 'moment';
import Image from 'next/image'
import React from 'react'

const SingleBlog = ({ blog }) => {
    console?.log(blog);
    let blogData = blog?.result
    return (
        <div className='container py-4'>
            <div className="row g-2">
                <div className="col-12 col-lg-8">
                    <h1>{blogData?.title}</h1>
                    <Person />{blogData?.author?.name}<small>&nbsp;|&nbsp;updated {moment(blogData?.updated_at).calendar()}</small>
                    <h5 className='text-secondary my-2'><i>{blogData?.description}</i></h5>
                    <div style={{ position: "relative", height: 500 }}>
                        <Image src={blogData?.img} alt={blogData?.title} width={1000} height={500} className='d-block border' style={{ height: "500px", width: "100%", objectFit: "contain" }} />
                    </div>
                    <div className='py-3'>
                        <div>
                            {blogData?.content}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="card text-center mx-auto rounded-0 shadow" style={{ width: '18rem' }}>
                        <div>
                            <Image src={blogData?.author?.profile ? blogData?.author?.profile : "/images/avatar/avatar1.jpg"} width={500}
                                height={300} className="img-fluid border-0 w-100" alt={blogData?.author?.name} style={{ height: 300, objectFit: "cover" }} />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title fw-semibold">
                                {blogData?.author?.name}
                            </h5>
                            <p className="card-text"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleBlog

export async function getServerSideProps({ params, req, res, query, preview, previewData, resolvedUrl, locale, locales, defaultLocale }) {
    console?.log("QUERY", query)
    const data = await fetch('http:localhost:5000/api/blogs/' + query?.slug);
    const blog = await data.json();
    if (!data) {
        return { notFound: true, }
    }
    return { props: { blog } }
}