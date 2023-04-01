import { useGlobalContext } from '@/context/globalContext'
import BlogCard from '@/layout/components/BlogCard'
import LoginChecker from '@/layout/components/LoginChecker'
import { Edit, Web, WebTwoTone } from '@mui/icons-material'
import { Avatar, Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Dashboard = () => {
  const { user } = useGlobalContext()
  return (
    <>
      <LoginChecker />
      <div>
        <div style={{ position: "relative", minHeight: 250, background: "url(/images/banner/banner.webp) no-repeat center", backgroundSize: "cover" }}>
        </div>
        <div className='container'>
          <div className='rounded-5 border p-3 bg-white shadow' style={{ transform: "translate(0px,-70px)" }}>
            <div className="row g-2">
              <div className="col-12 col-lg-2">
                <Avatar sx={{ maxWidth: "100%", height: 150, width: 150 }}></Avatar>
              </div>
              <div className="col-12 col-lg-7">
                <h1>Saurabh Sharma</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, sint! Nulla qui, earum nobis sequi at eum natus quod provident nemo? Tempora ad accusamus nostrum hic excepturi minus ut tempore.</p>
                <span>
                  <WebTwoTone /> www.saurabhcoded.com
                </span>
              </div>
              <div className="col-12 col-lg-3">
                <Button variant='contained' size='large' className='rounded text-capitalize'><Edit />&nbsp;Write Blog</Button>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2 pb-5">
            <div className="col">
              <BlogCard />
            </div>
            <div className="col">
              <BlogCard />
            </div>
            <div className="col">
              <BlogCard />
            </div>
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#">Previous</a></li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
export default Dashboard