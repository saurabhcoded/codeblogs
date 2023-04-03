import { useGlobalContext } from '@/context/globalContext'
import useApi from '@/lib/useApi'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import slugify from 'slugify'

const AddBlog = () => {
    const ENDPOINT = useApi();
    const router = useRouter();
    const { user } = useGlobalContext();
    const blogForm = useFormik({
        initialValues: {
            title: "",
            slug: "",
            img: "",
            description: "",
            content: "",
        },
        onSubmit: async (values, action) => {
            try {
                const response = await ENDPOINT.authformdata.post("/blogs", { ...values, author: user?.id });
                console?.log(response)
                switch (response?.data?.status) {
                    case "success":
                        toast.dismiss();
                        toast.success("Blog Added Successfully");
                        action.resetForm();
                        break;
                    case "error":
                        toast.dismiss();
                        toast.error(response?.data?.message);
                        break;
                    case "warning":
                        toast.dismiss();
                        toast.error(response?.data?.message);
                        break;
                    default:
                        toast.dismiss();
                        toast(response?.data?.message);
                        break;
                }
            } catch (error) {
                let msg = error?.response?.data?.message ? error?.response?.data?.message : "Oops Something Went Wrong!"
                toast.dismiss();
                toast.error(msg);
            }
        }
    })
    useEffect(() => {
        blogForm?.setFieldValue("slug", slugify(blogForm?.values?.title))
    }, [blogForm?.values?.title])
    useEffect(() => {
        if (user?.role === "reader") {
            router.push("/blog");
        }
    }, [user])
    return (
        <>
            <div className="py-4 bg-light">
                <h3 className='fw-bold text-center'>Add Blog</h3>
            </div>
            <div className='container py-5'>
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
                            <input type="file" id='img' name='img' onChange={(e) => blogForm.setFieldValue("img", e.target.files[0])} className="form-control form-control-lg" />
                        </div>
                        <div className="form-group col-12 col-lg-12">
                            <label htmlFor="img" className="form-label">Content</label>
                            <textarea id='content' name='content' value={blogForm.values.content} onChange={blogForm.handleChange} rows={3} className="form-control form-control-lg"></textarea>
                        </div>
                        <div className="col-12">
                            <button type='submit' className={`btn ${blogForm?.isSubmitting ? "btn-success" : "btn-dark"} btn-lg`} disabled={blogForm?.isSubmitting}>
                                {blogForm.isSubmitting ?
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Submitting...</span>
                                        </div>
                                    </div>
                                    :
                                    "Save Blog"
                                }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddBlog