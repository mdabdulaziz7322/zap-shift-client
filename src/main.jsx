import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { router } from './router/router.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "leaflet/dist/leaflet.css";
import Aos from 'aos';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentProvider } from './context/PaymentContext.jsx';



Aos.init();

const queryClient = new QueryClient();


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PaymentProvider>
          <Elements stripe={stripePromise}>
            <div className="font-urbanist max-w-7xl mx-auto">
              <RouterProvider router={router} />
              
            </div>
          </Elements>
        </PaymentProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)


