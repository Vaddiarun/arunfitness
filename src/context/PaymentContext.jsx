import { createContext, useContext, useState } from 'react';
import PaymentModal from '../components/PaymentModal';

const PaymentContext = createContext({
  openPaymentModal: () => {},
  closePaymentModal: () => {},
});

export function PaymentProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    topic: 'Online Transformation Consultation',
    defaultDetails: {},
  });

  const openPaymentModal = ({ topic = 'Online Transformation Consultation', defaultDetails = {} } = {}) => {
    setModalState({
      isOpen: true,
      topic,
      defaultDetails,
    });
  };

  const closePaymentModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <PaymentContext.Provider value={{ openPaymentModal, closePaymentModal }}>
      {children}
      <PaymentModal
        isOpen={modalState.isOpen}
        onClose={closePaymentModal}
        topic={modalState.topic}
        defaultDetails={modalState.defaultDetails}
      />
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const ctx = useContext(PaymentContext);
  if (!ctx) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return ctx;
}
