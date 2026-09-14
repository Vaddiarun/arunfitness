import { createContext, useContext, useState } from 'react';
import PaymentModal from '../components/PaymentModal';
import { CONSULTATION_FEE } from '../lib/config';

const PaymentContext = createContext({
  openPaymentModal: () => {},
  closePaymentModal: () => {},
});

const DEFAULTS = {
  topic: 'Online Transformation Consultation',
  type: 'consultation',
  amount: CONSULTATION_FEE,
  defaultDetails: {},
};

export function PaymentProvider({ children }) {
  const [modalState, setModalState] = useState({ isOpen: false, ...DEFAULTS });

  const openPaymentModal = ({ topic = DEFAULTS.topic, type = DEFAULTS.type, amount = DEFAULTS.amount, defaultDetails = {} } = {}) => {
    setModalState({
      isOpen: true,
      topic,
      type,
      amount,
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
        type={modalState.type}
        amount={modalState.amount}
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
