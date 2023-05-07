import useApi from '@/lib/useApi'
import { DeleteForever, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
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
                        <th scope="col">img</th>
                        <th scope="col">Title</th>
                        <th scope="col">slug</th>
                        <th scope="col">Updated At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs?.map((blog, i) => {
                        return <>
                            <tr key={i}>
                                <td>
                                    <Link href={"/blog/" + blog?.slug}>
                                        <Image src={blog?.img} width={100}
                                            height={60} className="img-fluid rounded border" alt="..." style={{ height: 60, width: 100, objectFit: "cover", objectPosition: "top" }} />
                                    </Link>
                                </td>
                                <td>{blog?.title}</td>
                                <td>{blog?.slug}</td>
                                <td>{moment(blog?.updated_at).calendar()}</td>
                                <td>
                                    <div className="d-flex">
                                        <IconButton onClick={() => handleDelete(blog?._id)} className='shadow-sm m-1 text-danger' sx={{ background: "whitesmoke" }}>
                                            <DeleteForever className='fs-6' />
                                        </IconButton>
                                        <Link href={"/dashboard/edit/" + blog?.slug} passHref>
                                            <IconButton className='text-success shadow-sm m-1' sx={{ background: "whitesmoke" }}>
                                                <Edit className='fs-6' />
                                            </IconButton>
                                        </Link>
                                    </div>
                                </td>
                            </tr >
                        </>
                    })}
                </tbody>
            </table>

        </div >
    )
}

export default BlogsTable