
import React from 'react';
import UseAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const MyParcels = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const { data: myParcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });
    console.log(myParcels);

    const handleDelete = async (id) => {
       const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to recover this parcel!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#dc2626',
            confirmButtonText: 'Yes, delete it!',
        });
        if (confirm.isConfirmed) {
            try{
                axiosSecure.delete(`/parcels/${id}`).
            then( res => {
                console.log(res.data);
                    if (res.data.deletedCount) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your parcel has been deleted.',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                       
                    }
                    refetch();
                
            });
            } catch (error) {
                console.error('Error deleting parcel:', error);
            }
            
        }
    };
        
   

    const total = myParcels.length;
    const returns = myParcels.filter(parcel => parcel.returned).length;
    const paidReturns = myParcels.filter(parcel => parcel.returned && parcel.payment_Status === 'Paid').length;

    return (
        <div className="space-y-6">

            {/* ================= SUMMARY CARDS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <p className="text-sm text-gray-500">Total Parcels</p>
                        <p className="text-3xl font-bold">{total}</p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <p className="text-sm text-gray-500">Total Returns</p>
                        <p className="text-3xl font-bold">{returns}</p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <p className="text-sm text-gray-500">Paid Returns</p>
                        <p className="text-3xl font-bold">{paidReturns}</p>
                    </div>
                </div>

            </div>

            {/* ================= MOBILE VIEW (CARDS) ================= */}
            <div className="space-y-4 md:hidden">
                {myParcels.map(parcel => (
                    <div
                        key={parcel._id}
                        className="card bg-base-100 shadow"
                    >
                        <div className="card-body space-y-2 text-sm">

                            <div className="flex justify-between">
                                <span className="font-semibold">Tracking ID</span>
                                <span className="font-mono">{parcel.tracking_id}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Date</span>
                                <span>
                                    {new Date(parcel.creation_date).toLocaleDateString()}
                                </span>
                            </div>

                            <div>
                                <p className="font-semibold">{parcel.receiverName}</p>
                                <p className="text-xs text-gray-500">
                                    {parcel.receiverAddress}
                                </p>
                                <p className="text-xs">{parcel.receiverPhone}</p>
                            </div>

                            <div className="flex justify-between items-center">
                                <span>Status</span>
                                <span
                                    className={`badge badge-sm ${parcel.delivery_status === 'not collected'
                                        ? 'badge-warning'
                                        : parcel.delivery_status === 'delivered'
                                            ? 'badge-success'
                                            : 'badge-ghost'
                                        }`}
                                >
                                    {parcel.delivery_status}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span>Payment</span>
                                <span
                                    className={`badge badge-sm ${parcel.payment_status === 'pending'
                                        ? 'badge-warning'
                                        : 'badge-success'
                                        }`}
                                >
                                    {parcel.payment_status}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Cost</span>
                                <span className="font-semibold">
                                    ৳{parcel.deliveryCost}
                                </span>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button className="btn btn-xs btn-success flex-1">
                                    Pay
                                </button>
                                <button className="btn btn-xs btn-neutral flex-1">
                                    View
                                </button>
                                <button
                                    onClick={() => handleDelete(parcel._id)}
                                    disabled={parcel.payment_status === 'paid'}
                                    className="btn btn-xs btn-error flex-1"
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* ================= TABLET & DESKTOP VIEW ================= */}
            <div className="hidden md:block bg-base-100 rounded-xl shadow overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="text-sm">
                            <th>ID</th>
                            <th>Date</th>
                            <th>Recipient</th>
                            <th>Status</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myParcels.map(parcel => (
                            <tr key={parcel._id} className="text-sm">
                                <td className="font-mono">{parcel.tracking_id}</td>

                                <td>
                                    {new Date(parcel.creation_date).toLocaleDateString()}
                                </td>

                                <td className="max-w-[220px]">
                                    <p className="font-medium truncate">
                                        {parcel.receiverName}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {parcel.receiverAddress}
                                    </p>
                                    <p className="text-xs">
                                        {parcel.receiverPhone}
                                    </p>
                                </td>

                                <td>
                                    <span
                                        className={`badge badge-sm ${parcel.delivery_status === 'not collected'
                                            ? 'badge-warning'
                                            : parcel.delivery_status === 'delivered'
                                                ? 'badge-success'
                                                : 'badge-ghost'
                                            }`}
                                    >
                                        {parcel.delivery_status}
                                    </span>
                                </td>

                                <td className="font-semibold">
                                    ৳{parcel.deliveryCost}
                                </td>

                                <td>
                                    <span
                                        className={`badge badge-sm ${parcel.payment_status === 'pending'
                                            ? 'badge-warning'
                                            : 'badge-success'
                                            }`}
                                    >
                                        {parcel.payment_status}
                                    </span>
                                </td>

                                <td className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <button className="btn btn-xs btn-success">
                                            Pay
                                        </button>
                                        <button className="btn btn-xs btn-neutral">
                                            View
                                        </button>
                                        <button
                                            onClick={() => handleDelete(parcel._id)}
                                            disabled={parcel.payment_status === 'paid'}
                                            className="btn btn-xs btn-error">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyParcels;