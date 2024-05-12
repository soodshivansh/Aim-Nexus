"use client"
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from "next/link"
import { useAppContext } from '@/contexts/Provider';

export default function LoginForm() {

  const [loading, setloading] = useState(false);
  const {login} = useAppContext()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6,"Your password should contain atleast 6 characters").required('Required'),
    }),
    onSubmit: (values) => {
      performlogin(values)
    },
  });

  const performlogin = async(values) => {
    const {email,password} = values;
    await login(email,password);
  }

  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col px-12 py-40 space-y-6 w-full'>

    <h1 className='font-medium text-xl'>Sign in to Dribble</h1>

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

      <button className='bg-[#03A9F4] rounded-full p-2 text-white font-semibold' type="submit">Submit</button>
        <span className='flex justify-center text-sm text-grey-400'>Dont have an account?<Link href = "/signup"><strong>&nbsp;Create account here</strong></Link></span>
    </form>
  );
};



