import { CardElement, useElements } from "@stripe/react-stripe-js"
import { useState } from "react"

const checkoutForm = (props) => {

    const stripe = useStripe()

    const elements = useElements()

    const [processing, setProcessing] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements)
            return

        const result = await stripe.confirmCardPayment(props.clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })

        if (result.error) {
            setProcessing(false)
        } else if (result.paymentIntent.status === 'succeeded') {
            await props.onPaymentSuccess(result.paymentIntent.id)
            setProcessing(false)
        }
    }

    return (
        <>
        </>
    )
}

export default checkoutForm