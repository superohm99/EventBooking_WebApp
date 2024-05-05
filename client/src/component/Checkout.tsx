import { useEffect, useState } from 'react'
import Receipt from './Receipt'
import Navbar from './Navbar'
import '../style/Checkout.css'
import PaymentForm from './PaymentForm'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { EventScheduleProps, SeatProps, VenueProps } from './Reserve_container'

const pbKey = await fetch('http://localhost:3001/payment/config', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
const { publishableKey } = await pbKey.json()
const stripePromise = loadStripe(publishableKey)

type UserProps = {
    name: string;
    email: string;
    price: number;
    reserveId: string;
    handlePayment: (data: { status: boolean, paymentIntendId: string }) => void;
}

export type ReceiptProps = {
    event_name: string;
    event_description: string;
    image: string;
    venue: VenueProps;
    event_schedule: EventScheduleProps;
    seat: SeatProps;
}

function Checkout() {

    const params = useParams()

    const navigate = useNavigate()

    const [event, setEvent] = useState<ReceiptProps>({
        event_name: '',
        event_description: '',
        image: '',
        venue: {
            name: '',
            location: '',
            capacity: 0,
            _id: ''
        },
        event_schedule: {
            start_date: new Date(),
            end_date: new Date(),
            start_time: new Date(),
            end_time: new Date(),
            _id: ''
        },
        seat: {
            type: '',
            section: '',
            row: '',
            seat_num: '',
            price: 10
        }
    })

    const [paymentIntentId, setPaymentIntentId] = useState('' as string)


    const handlePayment = (data: { status: boolean, paymentIntendId: string }) => {
        setPaymentIntentId(data.paymentIntendId)
        setPaymentStatus(data.status)
    }

    const [userData, setUserData] = useState<UserProps>({
        name: 'John Doe',
        email: 'j.d@mail.com',
        price: 10,
        reserveId: params.Id as string,
        handlePayment: handlePayment
    })

    const [paymentStatus, setPaymentStatus] = useState(false)

    useEffect(() => {
        if (paymentStatus === true) {
            console.log('Payment Success')

            const updateStatus = async () => {
                const response = await fetch(`http://localhost:3001/payment/${params.Id}/update-payment-status`, {
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
            navigate('/profile/history', { replace: true })
        }

    }, [paymentStatus])


    useEffect(() => {
        const getEventDetails = async () => {
            const token = localStorage.getItem('access_token')
            const response = await axios.post(`http://localhost:3001/reserve/get_reserve/${params.Id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

            const data = await response.data
            setEvent(data)
            setUserData({ ...userData, price: data.seat.price })
        }
        getEventDetails()
    }, [params.Id])

    return (
        <>
            <Navbar />
            <div className="checkout-container">
                <div className="checkout">
                    <Receipt event={event} />
                    <Elements stripe={stripePromise} options={{ locale: 'th' }} >
                        <PaymentForm userData={userData} />
                    </Elements>
                </div>
            </div>
        </>
    )
}

export default Checkout
