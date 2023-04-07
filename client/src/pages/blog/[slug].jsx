import SearchListItem from '@/layout/SearchListItem';
import useApi from '@/lib/useApi';
import { Person, Search } from '@mui/icons-material';
import { Avatar, Button } from '@mui/material'
import moment from 'moment';
import Image from 'next/image'
import React, { useState } from 'react'

const SingleBlog = ({ blog }) => {
    console?.log(blog);
    let blogData = blog?.result
    const ENDPOINT = useApi();
    const [searchList, setSearchList] = useState([]);
    const [searchText, setSeachText] = useState("")
    const searchBlogsList = async (searchKey) => {
        try {
            const response = await ENDPOINT.json.get("/blogs?search=" + searchKey)
            console.log(response);
            if (response.data?.status === "success") {
                setSearchList(response?.data?.result)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleSearch = () => {
        searchBlogsList(searchText);
    }
    return (
        <div className='container py-4'>
            <div className="row g-2">
                <div className="col-12 col-lg-9">
                    <h1>{blogData?.title}</h1>
                    <Person />{blogData?.author?.name}<small>&nbsp;|&nbsp;updated {moment(blogData?.updated_at).calendar()}</small>
                    <h5 className='text-secondary my-2'><i>{blogData?.description}</i></h5>
                    <div style={{ position: "relative", height: 500 }}>
                        <Image src={blogData?.img} alt={blogData?.title} width={1000} height={500} className='d-block border' style={{ height: "500px", width: "100%", objectFit: "cover", objectPosition: "top" }} />
                    </div>
                    <div className='py-3'>
                        <div className='content-box' dangerouslySetInnerHTML={{ __html: blogData?.content }}>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-3">


                    <div className="card text-center mx-auto rounded w-100">
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
                    <hr />
                    <div className='mt-4'>
                        <div className="input-group mb-2">
                            <input type="text" value={searchText} onChange={(e) => setSeachText(e.target.value)} className="form-control form-control-lg border-dark rounded-0" />
                            <Button variant='contained' onClick={handleSearch} size='small' className="btn btn-dark btn-lg rounded-0"><Search /></Button>
                        </div>
                        <div>
                            {searchList.length ? <div className='pt-2 border-top d-flex align-items-center justify-content-between w-100'><h5 className='fw-semibold'>Search Result</h5><Button onClick={() => { setSearchList([]); setSeachText(""); }} color='error'>clear</Button></div> : ""}
                            {searchList?.map((item, i) => {
                                return <SearchListItem key={i} blog={item} />
                            })}
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
    const data = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/blogs/' + query?.slug);
    const blog = await data.json();
    if (!data) {
        return { notFound: true, }
    }
    return { props: { blog } }
}