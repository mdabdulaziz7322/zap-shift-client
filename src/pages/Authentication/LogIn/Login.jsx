import React from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin';
import UseAuth from '../../../hooks/UseAuth';
import { useLocation, useNavigate } from 'react-router';


const Login = () => {

    const {signInUser} = UseAuth();
    

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const location = useLocation();
    const from = location.state?.from || '/';
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data);
        signInUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            navigate(from);

        })
        .catch(error => {
            console.error(error);
        });

    };
      return (
        <div className='hero min-h-screen bg-base-100 px-4'>
            <div className='card w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg shadow-2xl bg-base-100'>
        <div className='card-body p-6 sm:p-8'>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">
                        Login now!
                    </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <fieldset className="fieldset space-y-4">

                {/* Email */}
                <div>
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="input input-bordered w-full"
                        placeholder="Email"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="label">Password</label>
                    <input
                        type="password"
                        {...register("password", { required: true, minLength: 6 })}
                        className="input input-bordered w-full"
                        placeholder="Password"
                    />

                    {errors.password?.type === "required" && (
                        <p className="text-red-600 text-sm mt-1">
                            Password is required
                        </p>
                    )}

                    {errors.password?.type === "minLength" && (
                        <p className="text-red-600 text-sm mt-1">
                            Password must be at least 6 characters
                        </p>
                    )}
                </div>

                {/* Forgot password */}
                <div className="text-right">
                    <a className="link link-hover text-sm">
                        Forgot password?
                    </a>
                </div>

                {/* Submit */}
                <button className="btn btn-neutral w-full mt-2">
                    Login
                </button>
                <div>
                    <SocialLogin></SocialLogin>
                </div>

            </fieldset>
        </form>
        </div>
        </div>
        </div>
    );
};

export default Login;