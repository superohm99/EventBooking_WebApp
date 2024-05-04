import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import '../style/PaymentForm.css'

type UserProps = {
    userData: {
        name: string;
        email: string;
        handlePayment: (data: { status: boolean, paymentIntendId: string }) => void;
    }
}

const options = {
    style: {
        base: {
            fontSize: '30px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
}

function PaymentForm({ userData }: UserProps) {

    const [isCardNumberValid, setIsCardNumberValid] = useState(false);
    const [isExpiryValid, setIsExpiryValid] = useState(false);
    const [isCvcValid, setIsCvcValid] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false)


    const stripe = useStripe()
    const elements = useElements()

    const handleClick = () => {
        setIsSubmitted(true)
    }

    const getSecret = async () => {
        const response = await fetch('http://localhost:3001/payment/507f1f77bcf86cd799439042/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 20
            }),
        });
        const data = await response.json();
        return data;
    };

    const makePayment = async () => {
        if (!stripe || !elements) {
            return;
        }

        try {
            const { clientSecret, paymentIntendId } = await getSecret();
            console.log("secret", clientSecret);
            console.log("payment", paymentIntendId);

            const cardElement = elements.getElement(CardNumberElement);

            const paymentMethodReq = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement!,
            });

            if (paymentMethodReq.error) {
                console.log('error');
                console.log(paymentMethodReq.error.message);
                return;
            }

            const { paymentMethod } = paymentMethodReq;
            if (!paymentMethod) {
                console.log('error 2');
                return;
            }

            console.log('paymentMethod', paymentMethod);

            const { error , paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            console.log('paymentIntent', paymentIntent);

            if (error) {
                console.log(error.message);
                alert('Payment Failed');
                return;
            }

            console.log('paymentIntent2 ', paymentIntent);

            if (paymentIntent.status === 'succeeded') {
                userData.handlePayment({ status: true, paymentIntendId });
            }

        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }

    }

    useEffect(() => {
        if (isSubmitted) {
            const processPayment = async () => {
                if (isSubmitted) {
                    console.log('before payment');
                    await makePayment(); // Wait for makePayment to finish
                    console.log('after payment');
                }
            };
            if (isCardNumberValid && isExpiryValid && isCvcValid){
                processPayment();
            }
            else{
                alert('Invalid Card Information');
            }
        }

        return () => {
            setIsSubmitted(false)
        }
    }, [isSubmitted])

    return (
        <>
            <div className="payment-form">
                <h1>Payment Information</h1>
                <div className="card-element">
                    <div className="card-number">
                        <p>Card number</p>
                        <CardNumberElement options={options} onChange={(e) => setIsCardNumberValid(e.complete)} />
                    </div>
                    <div className="card-expired">
                        <p>Expiration date</p>
                        <CardExpiryElement options={options} onChange={(e) => setIsExpiryValid(e.complete)} />
                    </div>
                    <div className="card-cvc">
                        <p>CVC</p>
                        <CardCvcElement options={options} onChange={(e) => setIsCvcValid(e.complete)} />
                    </div>
                </div>
                <div className="button-option">
                    <button type="submit">Back</button>
                    <button type="submit" onClick={handleClick}>Pay Now</button>
                </div>

            </div>
        </>
    )
}

export default PaymentForm
