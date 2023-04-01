import SingleBlogListItem from '@/layout/SingleBlogListItem'
import SingleBloggerListItem from '@/layout/SingleBloggerListItem'
import { ArrowBackIos, ArrowBackIosTwoTone, ArrowForwardIosTwoTone } from '@mui/icons-material'
import React from 'react'

const Blog = () => {
    return (
        <>
            <div className="bg-light py-3">
                <h1 className='text-center'>Blog</h1>
            </div>
            <div className='container py-4'>
                <div className="row g-2">
                    <div className="col-12 col-lg-9">
                        <div>
                            {/* Sorting and Searching  */}
                            <div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control form-control-lg" />
                                    <button className="btn btn-dark btn-lg">Search</button>
                                </div>
                                <div className='mb-3 row row-cols-2 row-cols-lg-4'>
                                    <div className='col'>
                                        <select name="sort" id="" className="form-select form-select-lg d-inline">
                                            <option value="title">A-Z</option>
                                            <option value="createdAt">Newest</option>
                                            <option value="createdAt">Oldest</option>
                                            <option value="update">Updated Recently</option>
                                            <option value="trending">Trending Blogs</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-outline-dark h-100 w-100">Apply</button>
                                    </div>
                                </div>
                            </div>
                            {/* List Of Blogs  */}
                            <div className='row row-cols-1 g-3'>
                                <div className="col">
                                    <SingleBlogListItem />
                                </div>
                                <div className="col">
                                    <SingleBlogListItem />
                                </div>
                            </div>
                            {/* Pagination  */}
                            <div className='py-4'>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination justify-content-center">
                                        <li class="page-item"><a class="page-link h-100" href="#"><ArrowBackIosTwoTone/></a></li>
                                        <li class="page-item"><a class="page-link h-100" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link h-100" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link h-100" href="#">3</a></li>
                                        <li class="page-item"><a class="page-link h-100" href="#"><ArrowForwardIosTwoTone/></a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                        <div className="container">
                            <div>
                                <h3>Top Bloggers</h3>
                                <SingleBloggerListItem />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog