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
                    <div style={{ position: "relative", height: 500 }}>
                        <Image src={blogData?.img} alt={blogData?.title} width={1000} height={500} className='d-block' style={{ height: "500px", width: "100%", objectFit: "contain" }} />
                    </div>
                    <div className='py-3'>
                        <h1>{blogData?.title}</h1>
                        <h4 className='text-secondary'><i>{blogData?.description}</i></h4>
                        <Person />{blogData?.author?.name}<small>updated {moment(blogData?.updated_at).calendar()}</small>
                        <div>
                            {blogData?.content}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="card text-center mx-auto rounded-4" style={{ width: '18rem' }}>
                        <div className='pt-4'>
                            <Avatar className="mx-auto rounded" sx={{ height: 150, width: 150 }}></Avatar>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{blogData?.author?.name}</h5>
                            <p className="card-text"></p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
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