import useApi from '@/lib/useApi'
import { DeleteForever, Edit } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const UsersTable = ({ users, reload }) => {
    const ENDPOINT = useApi();
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const response = await ENDPOINT.authjson.delete("/users?id=" + id);
                console.log(response);
                reload();
                toast.dismiss();
                toast.success("Deleted User")
            }
        })

    }
    return (
        <div className='table-responsive p-2'>
            <table className="table table-light table-designed table-striped w-100 shadow-sm rounded-2" style={{ overflow: "hidden" }}>
                <thead className=''>
                    <tr>
                        <th scope="col">Full&nbsp;Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, i) => {
                        return <>
                            <tr key={i}>
                                {/* <td>
                                    <Image src={user?.img} width={60}
                                        height={60} className="img-fluid rounded border" alt="..." style={{ maxHeight: 300, objectFit: "cover" }} />
                                </td> */}
                                <td>{user?.name}</td>
                                <td>{user?.phone}</td>
                                <td>{user?.email}</td>
                                <td>{user?.role}</td>
                                <td>{moment(user?.created_at).calendar("DD MM YY")}</td>
                                <td>
                                    <div className="d-flex">
                                        <Tooltip title={"Delete User"}>
                                            <IconButton onClick={() => handleDelete(user?._id)} className='shadow-sm m-1 text-danger btn-sm' sx={{ background: "whitesmoke" }}>
                                                <DeleteForever className='fs-6' />
                                            </IconButton>
                                        </Tooltip>
                                        {/* <Tooltip title={"Edit User"}>
                                            <IconButton className='text-success shadow-sm m-1 btn-sm' sx={{ background: "whitesmoke" }}>
                                                <Edit className='fs-6' />
                                            </IconButton>
                                        </Tooltip> */}
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

export default UsersTable