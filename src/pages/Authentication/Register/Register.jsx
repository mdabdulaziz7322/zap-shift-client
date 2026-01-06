import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../hooks/UseAuth';
import SocialLogin from '../SocialLogin/SocialLogin';
import { useNavigate } from 'react-router';
import axios from 'axios';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = UseAuth();
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState('')
    const axiosInstance = useAxios();

    const onSubmit = async (data) => {
        try {
            if (!profilePic) {
                alert("Please upload a profile picture");
                return;
            }

            const result = await createUser(data.email, data.password);
            console.log(result)

            const userInfo = {
                name: data.name,
                email: data.email,
                profilePic,
                role: "user",
                createdAt: new Date(),
                lastLogIn: new Date().toISOString(),
            };

            await axiosInstance.post('/users', userInfo);

            await updateUserProfile({
                displayName: data.name,
                photoURL: profilePic,
            });

            navigate("/login");

        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                Swal.fire({
                    icon: "error",
                    title: "Email already in use",
                    text: "Please login instead",
                });
                return;
            }

            console.error("Registration error:", error);
        }
    };
    const handleImageUpload = async (e) => {
        const image = e.target.files[0]
        console.log(image)
        const formData = new FormData();
        formData.append('image', image)
        const ImageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_KEY}`

        const res = await axios.post(ImageUrl, formData)
        setProfilePic(res.data.data.url)
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

                            <div className="flex justify-left mb-4">
                                <label className="relative cursor-pointer">
                                    <input
                                        type="file"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        hidden
                                    />

                                    <div className="w-15 h-15 rounded-full border-2 border-dashed flex items-center justify-center bg-gray-100 hover:bg-gray-200">
                                        <span className="text-2xl">📷</span>
                                    </div>
                                </label>
                            </div>

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