import {useEffect, useState} from 'react'
import Receipt from './Receipt'
import Navbar from './Navbar'
import '../style/Checkout.css'
import PaymentForm from './PaymentForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useNavigate } from 'react-router-dom'

const pbKey = await fetch('http://localhost:3001/payment/config', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
const { publishableKey } = await pbKey.json()
const stripePromise = loadStripe(publishableKey)

type EventProps = {
    event_image: string;
    event_name: string;
    event_date: Date;
    event_time: Date;
    event_location: string;
    seat: string;
    price: number;
}

type UserProps = {
    name: string;
    email: string;
    isSubmitted: boolean;
    handlePayment: (data: { status: boolean, paymentIntendId: string }) => void;
}

function Checkout() {

    const navigate = useNavigate()

    const eventData: EventProps = {
        event_image: 'https://www.shutterstock.com/shutterstock/photos/1423222013/display_1500/stock-vector-music-event-poster-design-template-on-colorful-background-with-flowing-shape-illustration-for-web-1423222013.jpg',
        event_name: 'Drive in Senja: Back to the Future',
        event_date: new Date(),
        event_time: new Date(),
        event_location: 'Parkiran Utama Mall @ Alam Sutera',
        seat: 'A12',
        price: 20,
    }

    const [paymentIntentId, setPaymentIntentId] = useState('' as string)

    const handlePayment = (data: { status: boolean, paymentIntendId: string }) => {
        setPaymentIntentId(data.paymentIntendId)
        setPaymentStatus(data.status)
    }

    const [userData, setUserData] = useState<UserProps>({
        name: 'John Doe',
        email: 'j.d@mail.com',
        isSubmitted: false,
        handlePayment: handlePayment
    })

    const [paymentStatus, setPaymentStatus] = useState(false)

    useEffect(() => {


        if(paymentStatus === true){
            console.log('Payment Success')
            
            const updateStatus = async () => {
                const response = await fetch('http://localhost:3001/payment/507f1f77bcf86cd799439042/update-payment-status', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: 'succeeded', paymentIntentId })
                })
                const data = await response.json()
                console.log(data)
            }
            updateStatus()
            alert('Payment Success')
            navigate('/', { replace: true })
        }

    }, [paymentStatus]) 

    return (
        <>
            <Navbar />
            <div className="checkout-container">
                <div className="checkout">
                    <Receipt event = {eventData} />
                    <Elements stripe={stripePromise} options={{ locale: 'th' }} >
                        <PaymentForm userData={userData} />
                    </Elements>
                </div>
            </div>
        </>
    )
}

export default Checkout
