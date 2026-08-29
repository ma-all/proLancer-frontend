import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import * as paymentService from '../../services/payments'



const ReceiptDetails = (props)=>{
    const {proposalId} = useParams()
    const navigate = useNavigate()
    const [receipt, setReceipt] = useState(null)
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState('')


    useEffect(()=>{
        const Receipt = async () =>{
            try {
                const data = await paymentService.getReceipt(proposalId)
                setReceipt(data) 
            } catch (error) {
                console.log('Error fetching receipt:' ,error)
                setError('Failed to load receipt details.')
            }finally{
                setLoading(false)
            }
        }
    })

}