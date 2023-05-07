import AddExperienceModal from '@/components/dashboard/AddExperienceModal'
import { Button } from '@mui/material'
import React from 'react'

const ExperienceTable = () => {
  return (
    <div>
      {/* Add Experience Modal  */}
      <AddExperienceModal />
      {/* Edit Experience Modal  */}
      {/* Table To SHow Experience  */}
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
            {/* {blogs?.map((blog, i) => {
              return <>
                <tr key={i}>
                  <td>
                    <Link href={"/blog/" + blog?.slug}>
                      <Image src={blog?.img} width={100}
                        height={60} className="img-fluid rounded border" alt="..." style={{ height: 60, width: 100, objectFit: "cover", objectPosition: "top" }} />
                    </Link>
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
                      <Link href={"/dashboard/edit/" + blog?.slug} passHref>
                        <IconButton className='text-success shadow-sm m-1' sx={{ background: "whitesmoke" }}>
                          <Edit className='fs-6' />
                        </IconButton>
                      </Link>
                    </div>
                  </td>
                </tr >
              </>
            })} */}
          </tbody>
        </table>

      </div >
    </div>
  )
}

export default ExperienceTable