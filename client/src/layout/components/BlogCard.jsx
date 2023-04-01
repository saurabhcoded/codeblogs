import Image from 'next/image'
import React from 'react'

const BlogCard = () => {
    return (
        <div className="card p-3">
            <Image width={300} height={200} src="/images/blogs/blog1.jpg" className="card-img-top rounded" alt="blog" style={{ objectFit: "cover" }} />
            <div className="card-body p-0 mt-2">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}

export default BlogCard