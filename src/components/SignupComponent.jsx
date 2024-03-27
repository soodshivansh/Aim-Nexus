"use client"
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from "next/link"
import { useAppContext } from '@/contexts/Provider';

export default function SignupForm() {

    const [loading, setloading] = useState(false);
    const {signup} = useAppContext()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name:Yup.string().required("Required").min(4,"Name must be atleast 4 characters"),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6,"Your password should contain atleast 6 characters").required('Required'),
    }),
    onSubmit: (values) => {
      performsignup(values);
    },
  });

  const performsignup = async (values) => {
    setloading(true)
    const {name,email,password} = values;
    await signup(name,email,password);
    setloading(false)
  }

  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col px-12 py-40 space-y-6 w-full'>

    <h1 className='font-medium text-xl'>Create new account for Dribble</h1>

    <div className='flex flex-col space-y-4'>
      <label htmlFor="name">Username</label>
      <input
        id="name"
        name="name"
        type="name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        className='border rounded p-2'
      />
      {formik.touched.name && formik.errors.name ? (
        <div className='text-red-400 text-sm'>{formik.errors.name}</div>
      ) : null}
    </div>

    <div className='flex flex-col space-y-4'>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className='border rounded p-2'
      />
      {formik.touched.email && formik.errors.email ? (
        <div className='text-red-400 text-sm'>{formik.errors.email}</div>
      ) : null}
    </div>

    <div className='flex flex-col space-y-4'>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        className='border rounded p-2'
      />
      {formik.touched.password && formik.errors.password ? (
        <div className='text-red-400 text-sm'>{formik.errors.password}</div>
      ) : null}
    </div>

      <button className='bg-[#03A9F4] rounded-full p-2 text-white font-semibold' type="submit">{loading ? "Signing up..." : "Sign up"}</button>
        <span className='flex justify-center text-sm text-grey-400'>Already have an account??<Link href = "/login"><strong>&nbsp;Login here</strong></Link></span>
    </form>
  );
};



