import CKeditor from '@/layout/components/CKeditor'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import slugify from 'slugify'

const AddBlog = () => {
    const [data, setData] = useState("");
    const [editorLoaded, setEditorLoaded] = useState(true);
    const blogForm = useFormik({
        initialValues: {
            title: "",
            slug: "",
            img: "",
            description: "",
            content: "",
            author: "",
        },
        onSubmit: async (values, action) => {
            console.log(values)
        }
    })
    return (
        <div className='container py-5'>
            <h3>Add Blog</h3>
            <form onSubmit={blogForm.handleSubmit}>
                <div className="row g-2">
                    <div className="form-group col-12 col-lg-6">
                        <label htmlFor="title" className="form-label">Blog Title</label>
                        <input type="text" value={blogForm.values.title} onChange={blogForm.handleChange} id='title' className="form-control form-control-lg" />
                    </div>
                    <div className="form-group col-12 col-lg-6">
                        <label htmlFor="slug" className="form-label">Slug</label>
                        <input type="text" disabled={true} value={slugify(blogForm.values.title)} id='slug' name='slug' className="form-control form-control-lg" />
                    </div>
                    <div className="form-group col-12">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea id='description' name='description' value={blogForm.values.description} onChange={blogForm.handleChange} rows={3} className="form-control form-control-lg"></textarea>
                    </div>
                    <div className="form-group col-12 col-lg-12">
                        <label htmlFor="img" className="form-label">image</label>
                        <input type="file" id='img' name='img' className="form-control form-control-lg" />
                    </div>
                    <div className="form-group col-12 col-lg-12">
                        <label htmlFor="img" className="form-label">Content</label>
                        <div>
                            <CKeditor
                                name="description"
                                onChange={(data) => {
                                    setData(data);
                                }}
                                editorLoaded={editorLoaded}
                            />
                            {/* {JSON.stringify(data)} */}
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-dark btn-lg">Save Blog</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddBlog