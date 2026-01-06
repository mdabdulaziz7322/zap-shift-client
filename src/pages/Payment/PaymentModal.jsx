import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { usePayment } from '../../context/PaymentContext';
import CheckoutForm from './CheckoutForm';




const PaymentModal = ({ refetch }) => {
    const { parcelId, closePaymentModal } = usePayment();
    const axiosSecure = useAxiosSecure();
    

    const { data: parcel, isLoading } = useQuery({
        queryKey: ['parcel', parcelId],
        enabled: !!parcelId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        },
    });

    if (!parcelId) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-lg">
                <h3 className="font-bold text-lg mb-4">Complete Payment</h3>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="text-sm mb-4 space-y-1">
                            <p><strong>Tracking:</strong> {parcel.tracking_id}</p>
                            <p><strong>Receiver:</strong> {parcel.receiverName}</p>
                            <p><strong>Cost:</strong> ৳{parcel.deliveryCost}</p>
                        </div>

                        <CheckoutForm
                            parcel={parcel}
                            onSuccess={() => {
                                closePaymentModal();
                                refetch();
                                
                            }}
                        />
                    </>
                )}

                <div className="modal-action">
                    <button onClick={closePaymentModal} className="btn btn-outline">
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default PaymentModal;