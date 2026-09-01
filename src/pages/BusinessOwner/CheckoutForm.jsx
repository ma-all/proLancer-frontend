import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"

const CheckoutForm = (props) => {

    const stripe = useStripe()

    const elements = useElements()

    const [processing, setProcessing] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements)
            return
        setProcessing(true)
        setErrorMessage('')
        const result = await stripe.confirmCardPayment(props.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })

        if (result.error) {
            setErrorMessage(result.error.message)
            setProcessing(false)
        } else if (result.paymentIntent.status === 'succeeded') {
            await props.onPaymentSuccess(result.paymentIntent.id)
            setProcessing(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <div className="card-element">
                <CardElement />
            </div>
            {errorMessage && <p className="payment-msg-error">{errorMessage}</p>}
            <button className="pay-amt-btn" type='submit' disabled={!stripe || processing} > {processing ? 'Processing Payment..' : 'Pay Now'}</button>
        </form>
    )
}

export default CheckoutForm