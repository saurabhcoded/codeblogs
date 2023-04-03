import useApi from '@/lib/useApi'
import { DeleteForever, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const BlogsTable = ({ blogs, reload }) => {
    const ENDPOINT = useApi();
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = await ENDPOINT.authjson.delete("/blogs?id=" + id);
                console.log(response);
                reload();
                toast.dismiss();
                toast.success("Deleted Blog")
            }
        })

    }
    return (
        <div className='table-responsive p-2'>
            <table className="table table-light table-designed table-striped w-100 shadow-sm rounded-2" style={{ overflow: "hidden" }}>
                <thead className=''>
                    <tr>
                        <th scope="col" className='bg-primary text-white'>img</th>
                        <th scope="col" className='bg-primary text-white'># ID</th>
                        <th scope="col" className='bg-primary text-white'>Title</th>
                        <th scope="col" className='bg-primary text-white'>slug</th>
                        <th scope="col" className='bg-primary text-white'>Updated At</th>
                        <th scope="col" className='bg-primary text-white'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs?.map((blog, i) => {
                        return <>
                            <tr>
                                <td>
                                    <Image src={blog?.img} width={60}
                                        height={60} className="img-fluid rounded border" alt="..." style={{ maxHeight: 300, objectFit: "cover" }} />
                                </td>
                                <td>{blog?._id}</td>
                                <td>{blog?.title}</td>
                                <td>{blog?.slug}</td>
                                <td>{moment(blog?.updated_at).calendar()}</td>
                                <td>
                                    <div className="d-flex">
                                        <IconButton onClick={() => handleDelete(blog?._id)} className='shadow-sm m-1 text-danger' sx={{ background: "whitesmoke" }}>
                                            <DeleteForever className='fs-6' />
                                        </IconButton>
                                        <IconButton className='text-success shadow-sm m-1' sx={{ background: "whitesmoke" }}>
                                            <Edit className='fs-6' />
                                        </IconButton>
                                    </div>
                                </td>
                            </tr>
                        </>
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default BlogsTable