import { useGlobalContext } from '@/context/globalContext'
import BlogsTable from '@/layout/BlogsTable'
import SingleBlogListItem from '@/layout/SingleBlogListItem'
import UsersTable from '@/layout/UsersTable'
import BlogCard from '@/layout/components/BlogCard'
import LoginChecker from '@/layout/components/LoginChecker'
import useApi from '@/lib/useApi'
import { Edit, Web, WebTwoTone } from '@mui/icons-material'
import { Avatar, Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const Dashboard = () => {
  const { user, token } = useGlobalContext();
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const ENDPOINT = useApi();
  const fetchAllBlogs = async () => {
    if (token) {
      try {
        const response = await ENDPOINT.authjson.get("/blogs/me");
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
        let msg = error?.response?.data?.message ? error?.response?.data?.message : "Oops Something Went Wrong!"
        toast.error(msg);
      }
    }
  }
  const fetchAllUsers = async () => {
    if (token && user?.role === "admin") {
      try {
        const response = await ENDPOINT.authjson.get("/users");
        console?.log(response);
        switch (response?.data?.status) {
          case "success":
            setUsers(response?.data?.result)
            break;
          case "error":
            toast.dismiss();
            toast.error(response?.data?.message);
            break;
          case "warning":
            toast.dismiss();
            toast.error(response?.data?.message);
            break;
        }
      } catch (error) {
        let msg = error?.response?.data?.message ? error?.response?.data?.message : "Oops Something Went Wrong!"
        toast.dismiss();
        toast.error(msg);
      }
    }
  }
  useEffect(() => {
    if (user?.role === "admin") {
      fetchAllUsers();
    }
    fetchAllBlogs();
  }, [token]);
  useEffect(() => {
    if (user?.role === "reader") {
      router.push("/blog");
    }
  })

  return (<>
    <LoginChecker />
    <div>
      <div style={{ position: "relative", minHeight: 250, background: "url(/images/banner/banner.webp) no-repeat center", backgroundSize: "cover" }}>
      </div>
      <div className='container bg-white rounded-4 shadow' style={{ transform: "translate(0px,-70px)" }}>
        <div className="row g-3">
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm">
              <Image src={user?.profile} width={200} height={300} className="rounded w-100" style={{ objectFit: "cover" }} alt={user?.name} />
              <div className="card-body">
                <h3 className="card-title fw-bold">{user?.name}</h3>
                <h5 className="card-title">{user?.name}</h5>
                <Button onClick={() => router.push("/dashboard/add")} variant='outlined' color='secondary' className='text-capitalize rounded-3'><Edit sx={{ fontSize: 20 }} />&nbsp; Write Blog</Button>
              </div>
            </div>
            {/* List Of Blogs  */}
          </div>
          <div className='col-12 col-lg-9'>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">{user?.role === "admin" ? "Blogs" : "My Blogs"}</button>
              </li>
              {user?.role === "admin" &&
                <li className="nav-item" role="presentation">
                  <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Users</button>
                </li>
              }
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                <BlogsTable blogs={blogs} reload={fetchAllBlogs} />
              </div>
              {user?.role === "admin" &&
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                  <UsersTable users={users} reload={fetchAllUsers} />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
export default Dashboard;
