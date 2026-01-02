import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../hooks/UseAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { useNavigate } from 'react-router';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = UseAuth();
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate("/login");
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className="hero min-h-screen bg-base-100 px-4">
            <div className="card w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg shadow-2xl bg-base-100">
                <div className="card-body p-6 sm:p-8">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">
                        Register now!
                    </h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset space-y-4">

                            <div>
                                <label className="label">Name</label>
                                <input
                                    type="text"
                                    {...register("name")}
                                    className="input input-bordered w-full"
                                    placeholder="Name"
                                />
                            </div>

                            <div>
                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    className="input input-bordered w-full"
                                    placeholder="Email"
                                />
                                {
                                    errors.email?.type === 'required' && <p className="text-red-600 text-sm mt-1">Email is required</p>
                                }
                            </div>

                            <div>
                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    {...register("password", { required: true, minLength: 6 })}
                                    className="input input-bordered w-full"
                                    placeholder="Password"
                                />
                                {
                                    errors.password?.type === 'required' && <p className="text-red-600 text-sm mt-1">Password is required</p>
                                }
                                {
                                    errors.password?.type === 'minLength' && <p className="text-red-600 text-sm mt-1">Password must be at least 6 characters</p>
                                }
                            </div>

                            <button className="btn btn-neutral w-full mt-4">
                                Register
                            </button>
                            <div className="mt-6 text-center space-y-4">

                                {/* Already have account */}
                                <p className="text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <a href="/login" className="text-primary font-medium link link-hover">
                                        Login
                                    </a>
                                </p>

                                {/* OR Divider */}
                                <div className="flex items-center gap-3">
                                    <span className="flex-1 h-px bg-gray-300"></span>
                                    <span className="text-xs text-gray-400 uppercase">or</span>
                                    <span className="flex-1 h-px bg-gray-300"></span>
                                </div>

                                {/* Google Register */}

                                <SocialLogin></SocialLogin>
                            </div>


                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;