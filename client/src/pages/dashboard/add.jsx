import { useGlobalContext } from '@/context/globalContext'
import useApi from '@/lib/useApi'
import * as yup from 'yup';
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import slugify from 'slugify'
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';
import { Avatar, Button, TextField } from '@mui/material';
import { Person, Person3Outlined, RemoveCircleOutlineTwoTone } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';

const modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["clean"],
    ],
};

const validationSchema = new yup.object({
    img: yup.mixed().required("Image is required"),
    title: yup.string().max(100).required("Title is Required"),
    slug: yup.string().required("Slug is required"),
    description: yup.string().required("Description is required"),
    content: yup.string().required("Description is required"),
});

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
        validationSchema,
        onSubmit: async (values, action) => {
            try {
                const response = await ENDPOINT.authformdata.post("/blogs", { ...values, author: user?.id });
                console?.log(response)
                switch (response?.data?.status) {
                    case "success":
                        toast.dismiss();
                        toast.success("Blog Added Successfully");
                        action.resetForm();
                        router.push("/dashboard");
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
    }, [user]);
    return (
        <>
            <div className="bg-light">
                <div className="container py-5 text-center">
                    <h1 className='fw-bold' style={{ fontSize: 55 }}>Write Blog</h1>
                    <div className="fs-5 text-secondary">
                        <Link href={"/"} passHref>
                            Dashboard
                        </Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <span className='text-secondary'>
                            Write Blog
                        </span>
                    </div>
                </div>
                <div>
                    <img src="/graphics/clouds.png" className='w-100 d-block' alt="cloud" />
                </div>
            </div>
            <div className='container py-5'>
                <form onSubmit={blogForm.handleSubmit}>
                    <div className="row row-cols-1 row-cols-lg-2">
                        <div className="col-12 col-lg-4 order-1 order-lg-2">
                            <div className="row g-3">
                                <div className="form-group col-12">
                                    <TextField label={"Blog Title"} type="text" value={blogForm.values.title} onChange={blogForm.handleChange} id='title' fullWidth
                                        error={blogForm.touched.title && blogForm.errors.title}
                                        helperText={blogForm.touched.title && blogForm.errors.title} />
                                </div>
                                <div className="form-group col-12">
                                    <TextField label={"Blog-Slug"} type="text" disabled={true} value={slugify(blogForm.values.title)} id='slug' name='slug' fullWidth
                                        error={blogForm.touched.slug && blogForm.errors.slug}
                                        helperText={blogForm.touched.slug && blogForm.errors.slug} />
                                </div>
                                <div className="form-group col-12">
                                    <TextField label={"Blog Description"} multiline rows={5} id='description' name='description' value={blogForm.values.description} onChange={blogForm.handleChange} fullWidth error={blogForm.touched.description && blogForm.errors.description}
                                        helperText={blogForm.touched.description && blogForm.errors.description} />
                                </div>
                                <div className="form-group col-12 col-lg-12">
                                    <div className="d-flex flex-column align-items-center justify-content-between">
                                        <div className="d-flex justify-content-between w-100">
                                            <h4>Main Image</h4>
                                            <div className="d-flex align-items-center">
                                                <Button variant="contained" component="label" className='rounded-pill px-4 py-2'>
                                                    {blogForm.values.img ? "Update" : "Upload"}
                                                    <input label={"img"} type="file" onChange={(e) => blogForm.setFieldValue("img", e.target.files[0])} hidden accept="image/*" />
                                                </Button>
                                                {blogForm.values.img ?
                                                    <Button onClick={() => blogForm.setFieldValue("img", "")} variant='contained' color='error' className='rounded-pill ms-2'>
                                                        <RemoveCircleOutlineTwoTone className='fs-6' />&nbsp;Remove
                                                    </Button> : ""
                                                }
                                            </div>
                                        </div>

                                        {blogForm.values.img ? <Image className='rounded w-100 mt-3' style={{ objectFit: "contain", border: "1px dotted grey" }} alt="main" src={blogForm.values.img ? URL.createObjectURL(blogForm.values.img) : ""} height={300} width={300} /> : ""}
                                    </div>
                                    <span className='text-danger text-start fw-bold'>{blogForm.touched.img && blogForm.errors.img}</span>
                                </div>
                                <div className="col-12">
                                    <Button type='submit' variant='contained' color={blogForm?.isSubmitting ? "success" : "primary"} fullWidth className={`text-capitalize rounded py-3`} disabled={blogForm?.isSubmitting}>
                                        {blogForm.isSubmitting ?
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Submitting...</span>
                                                </div>
                                            </div>
                                            :
                                            "Publish Blog"
                                        }
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-8 order-2 order-lg-1">
                            <h1 className='fw-bold'>{blogForm.values?.title}</h1>
                            {blogForm.values?.title ? <><Person3Outlined />{user?.name}<small>&nbsp;|&nbsp;updated {moment().calendar()}</small></> : ""}
                            {
                                blogForm.values?.title ? <p><i className='text-dark mt-2'>{blogForm?.values?.description}</i></p> : ""
                            }
                            {
                                blogForm.values?.img ? <Image className='rounded w-100 mt-3' style={{ objectFit: "cover", objectPosition: "top", border: "1px dotted grey" }} alt="main" src={blogForm.values.img ? URL.createObjectURL(blogForm.values.img) : ""} height={500} width={300} /> : ""
                            }
                            <ReactQuill modules={modules} theme="snow" name='content' onChange={(data) => blogForm.setFieldValue("content", data)} placeholder="Content goes here..." className='mb-5 mt-3' style={{ height: 700 }} />

                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddBlog