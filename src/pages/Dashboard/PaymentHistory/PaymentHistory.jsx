import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UseAuth from '../../../hooks/UseAuth';

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();

    useEffect(() => {
        if(user?.email) {
            axiosSecure.get(`/payments?email=${user.email}`)
            .then (res => {
                setPayments(res.data)
            })
            .catch(err => {
                console.log("Failed to fetch Payments", err)
            })
        }
    }, [axiosSecure, user])



    return (
        <div className="p-4 md:p-6">
            {/* ===== Title & Description ===== */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold">Payment History</h2>
                <p className="text-gray-600 mt-1">
                    View all your recent payments and transaction details.
                </p>
            </div>

            {/* ===== Desktop Table View ===== */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Payment Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <td>{index + 1}</td>
                                <td className="font-mono text-sm">
                                    {payment.transactionId}
                                </td>
                                <td>{payment.email}</td>
                                <td className="font-semibold">${payment.amount}</td>
                                <td>
                                    {new Date(payment.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {payments.length === 0 && (
                    <p className="text-center text-gray-500 py-6">
                        No payment history found.
                    </p>
                )}
            </div>

            {/* ===== Mobile Card View ===== */}
            <div className="md:hidden space-y-4">
                {payments.map(payment => (
                    <div
                        key={payment._id}
                        className="card bg-base-100 shadow-lg "
                    >
                        <div className="card-body p-4 space-y-2">
                            <p>
                                <span className="font-semibold">Transaction:</span>{" "}
                                <span className="font-mono text-sm">
                                    {payment.transactionId}
                                </span>
                            </p>

                            <p>
                                <span className="font-semibold">Email:</span>{" "}
                                {payment.email}
                            </p>

                            <p>
                                <span className="font-semibold">Amount:</span>{" "}
                                <span className="text-green-600 font-bold">
                                    ${payment.amount}
                                </span>
                            </p>

                            <p className="text-sm text-gray-500">
                                {new Date(payment.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}

                {payments.length === 0 && (
                    <p className="text-center text-gray-500">
                        No payment history found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;