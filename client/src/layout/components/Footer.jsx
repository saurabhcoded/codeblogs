import { Button, IconButton } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { Facebook, Instagram, LinkedIn, Twitter, WhatsApp } from '@mui/icons-material';
import Image from 'next/image';
const Footer = () => {
  return (
    <div className='bg-light py-4'>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          <div className="col">
            <Link href="/" passHref className="navbar-brand">
              <div className="d-flex align-items-center">
                <Image src={"/images/logo.webp"} height={80} width={80} />
                <h3 className="fw-bold lh-1">
                  CODE <br />
                  BLOGS
                </h3>
              </div>
            </Link>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae voluptatum distinctio ducimus laudantium tenetur deleniti pariatur amet nemo totam placeat ullam delectus voluptatem deserunt minus, dignissimos, minima quos alias commodi.</p>
            <IconButton sx={{ color: "navy", background: "white" }} className='shadow-sm me-1' href='https://www.facebook.com/' target='_blank'>
              <Facebook />
            </IconButton>
            <IconButton sx={{ color: "skyblue", background: "white" }} className='shadow-sm me-1' href='https://www.twitter.com/' target='_blank'>
              <Twitter />
            </IconButton>
            <IconButton sx={{ color: "blue", background: "white" }} className='shadow-sm me-1' href='https://www.linkedin.com/' target='_blank'>
              <LinkedIn />
            </IconButton>
            <IconButton sx={{ color: "tomato", background: "white" }} className='shadow-sm me-1' href='https://www.instagram.com/' target='_blank'>
              <Instagram />
            </IconButton>
            <IconButton sx={{ color: "green", background: "white" }} className='shadow-sm' href='https://www.whatsapp.com/' target='_blank'>
              <WhatsApp />
            </IconButton>
          </div>
          <div className="col">
            <h5>Blogs</h5>
            <ul className="ps-0">
              <li>
                <Link href={"/"}>Link to Blog</Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>Useful Links</h5>
            <ul className="ps-0">
              <li>
                <Link href={"/"}>Useful Link</Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>Newsletter</h5>
            <input type="text" className="form-control p-2" />
            <Button variant='contained' fullWidth size="large" className=' bg-dark rounded text-capitalize mt-2'>Subscribe Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer