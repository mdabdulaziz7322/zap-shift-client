import { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [parcelId, setParcelId] = useState(null);

  const openPaymentModal = (id) => setParcelId(id);
  const closePaymentModal = () => setParcelId(null);

  return (
    <PaymentContext.Provider value={{ parcelId, openPaymentModal, closePaymentModal }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);