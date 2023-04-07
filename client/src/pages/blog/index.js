import SearchListItem from '@/layout/SearchListItem'
import SingleBlogListItem from '@/layout/SingleBlogListItem'
import SingleBloggerListItem from '@/layout/SingleBloggerListItem'
import useApi from '@/lib/useApi'
import { ArrowBackIos, ArrowBackIosTwoTone, ArrowBackTwoTone, ArrowForwardIosTwoTone, ArrowForwardTwoTone, Search } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Blog = ({ blogs, page }) => {
    console.log("BLOGS", blogs);
    const [searchList, setSearchList] = useState([]);
    const router = useRouter();
    const ENDPOINT = useApi();
    const count = blogs?.count;
    const [showLoad, setShowLoad] = useState(true);
    const loadMoreHandler = (dir) => {
        if (dir == "prev") {
            let PrevPage = Number(page) > 1 ? Number - 1 : 0;
            router.replace("/blog?page=" + String(PrevPage));
        } else {
            let nextPage = Number(page) + 1
            if (nextPage * 10 < count) {
                router.replace("/blog?page=" + nextPage);
            } else {
                setShowLoad(false)
            }
        }
    }
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
        <>
            <div className="bg-light">
                <div className="container py-5 text-center">
                    <h1 className='fw-bold' style={{ fontSize: 55 }}>Blogs</h1>
                    <div className="fs-5 text-secondary">
                        <Link href={"/"} passHref>
                            Home
                        </Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <span className='text-secondary'>
                            Blogs
                        </span>
                    </div>
                </div>
                <div>
                    <img src="/graphics/clouds.png" className='w-100 d-block' alt="cloud" />
                </div>
            </div>
            <div className='container py-4'>
                <div className="row g-2">
                    <div className="col-12 col-lg-9">
                        <div>
                            {/* List Of Blogs  */}
                            <div className='row row-cols-1 row-cols-lg-2 g-3'>
                                {blogs?.result?.map((blog, i) => {
                                    return <div className='col' key={i}>
                                        <SingleBlogListItem blog={blog} />
                                    </div>
                                })}
                            </div>
                            {/* Pagination  */}
                            <div className='py-4 d-flex align-items-center'>
                                <IconButton className='m-1 text-white' sx={{ background: "navy" }} onClick={() => loadMoreHandler("prev")}><ArrowBackTwoTone /></IconButton>
                                <h4 className='px-3'>Page {Number(page) + 1}</h4>
                                <IconButton className='m-1 text-white' sx={{ background: "navy" }} onClick={loadMoreHandler}><ArrowForwardTwoTone /></IconButton>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                        <div>
                            <div className="input-group mb-2">
                                <input type="text" value={searchText} onChange={(e) => setSeachText(e.target.value)} className="form-control form-control-lg border-dark rounded-0" />
                                <Button variant='contained' onClick={handleSearch} size='small' className="btn btn-dark btn-lg rounded-0"><Search /></Button>
                            </div>
                            <div className='mb-3 row row-cols-2 g-2'>
                                <div className='col'>
                                    <select name="sort" id="" className=" rounded-0 form-select form-select-lg d-inline fs-6">
                                        <option value="title">A-Z</option>
                                        <option value="createdAt">Newest</option>
                                        <option value="createdAt">Oldest</option>
                                        <option value="update">Updated Recently</option>
                                        <option value="trending">Trending Blogs</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <button className="btn btn-outline-dark h-100 w-100 rounded-0 ">Apply</button>
                                </div>
                            </div>
                            <div>
                                {searchList.length ? <div className='pt-2 border-top d-flex align-items-center justify-content-between w-100'><h5 className='fw-semibold'>Search Result</h5><Button onClick={()=>{setSearchList([]);setSeachText("");}} color='error'>clear</Button></div>: ""}
                                {searchList?.map((item, i) => {
                                    return <SearchListItem key={i} blog={item} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog

export async function getServerSideProps({ params, req, res, query, preview, previewData, resolvedUrl, locale, locales, defaultLocale }) {
    if (query.text) {
        return { redirect: { destination: '/dashboard', permanent: false, }, }
    }
    console.log("url", process.env.NEXT_PUBLIC_BACKEND_URL)
    let page = query?.page ? query.page : 0;
    const data = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/blogs?page=' + page);
    const blogs = await data.json();
    if (!data) {
        return { notFound: true, }
    }
    return { props: { blogs, page } }
}