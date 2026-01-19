import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import UseAuth from '../../hooks/UseAuth';
import useTracking from '../../hooks/useTracking';
import { useQueryClient } from '@tanstack/react-query';


const CheckoutForm = ({ parcel, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();
    const { addTrackingStep } = useTracking();
    const queryClient = useQueryClient();

    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (parcel) {
            axiosSecure
                .post('/create-payment-intent', { amount: parcel.deliveryCost })
                .then(res => setClientSecret(res.data.clientSecret));
        }
    }, [parcel]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setLoading(true);

        const card = elements.getElement(CardElement)
        if (!card) {
            return
        }
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card },
        });
        if (error) {
            Swal.fire('Payment Failed', error.message, 'error');
            setLoading(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            await axiosSecure.post('/payments', {
                parcelId: parcel._id,
                amount: parcel.deliveryCost,
                transactionId: paymentIntent.id,
                email: user.email
            });

            await addTrackingStep({
                tracking_id: parcel.tracking_id,
                status: "Paid",
                label: "Payment Completed",
                updated_by: user.email
            });

            queryClient.invalidateQueries(['myParcels']);

            Swal.fire('Success', 'Payment completed!', 'success');
            onSuccess();

        }

        setLoading(false);

    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <CardElement className="p-3 border rounded" />
                <button type='submit' disabled={!stripe || !clientSecret || loading} className="btn btn-primary w-full">
                    {loading ? 'Processing...' : `Pay ৳${parcel.deliveryCost}`}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;