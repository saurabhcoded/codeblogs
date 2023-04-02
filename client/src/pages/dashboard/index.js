import { useGlobalContext } from '@/context/globalContext'
import BlogsTable from '@/layout/BlogsTable'
import SingleBlogListItem from '@/layout/SingleBlogListItem'
import BlogCard from '@/layout/components/BlogCard'
import LoginChecker from '@/layout/components/LoginChecker'
import useApi from '@/lib/useApi'
import { Edit, Web, WebTwoTone } from '@mui/icons-material'
import { Avatar, Button } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const { user, token } = useGlobalContext();
  const [blogs, setBlogs] = useState([]);
  const ENDPOINT = useApi();
  const fetchAllBlogs = async () => {
    if (token) {
      try {
        const response = await ENDPOINT.authjson.get("/blogs/me");
        console?.log(response)
        switch (response?.data?.status) {
          case "success":
            setBlogs(response?.data?.result)
            break;
          case "error":
            toast.error(response?.data?.message);
            break;
          case "warning":
            toast.warning(response?.data?.message);
            break;
        }
      } catch (error) {
        console.log(error);
        let msg = error?.response?.data?.message ? error?.response?.data?.message : "Oops Something Went Wrong!"
        toast.error(msg);
      }
    }
  }
  useEffect(() => {
    fetchAllBlogs();
  }, [token])
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
                <Link href={"/dashboard/add"} passHref><Button variant='contained' size='large' className='rounded text-capitalize'><Edit />&nbsp;Write Blog</Button></Link>
              </div>
            </div>
          </div>
          {/* List Of Blogs  */}
          <BlogsTable blogs={blogs} reload={fetchAllBlogs} />
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
export default Dashboard;
