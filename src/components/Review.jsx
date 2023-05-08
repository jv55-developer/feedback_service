import React, { useEffect, useState, useCallback } from "react"
import "./Review.css"
import logo from '../assets/logo.jpg'
import { useParams } from 'react-router-dom'
import { data } from '../data/data'
import emailjs from '@emailjs/browser'
import { format } from "date-fns"

export default function Review() {

  const [ additional_comment, set_Additional_Comment ] = useState()

  const param_value = useParams().value 
  const param_sender = useParams().sender 
  const param_recipient = useParams().recipient
  const id = format(new Date(), "yyyyMMddhhmmss")

  

  const email_sent = useCallback(() => {
    let templateParams = {
      rating: param_value,
      disp_name: param_sender,
      recipient: param_recipient,
      id,
      additional_comment
    }

    emailjs.send('service_z0aq7k9', 'template_fvpl8qf', templateParams, 'YPtwb8I5nIVznF0Kn')
    .then(res => {
       console.log(res)
       console.log('email sent!')
    }, err => {
        console.log(err)
    })

    console.log('email sent')
  }, [id, param_recipient, param_sender, param_value])

  useEffect(() => {
    email_sent()
  }, [email_sent])
  
  const handleSubmit = (e) => {
    e.preventDefault();

    email_sent()
  }

  return (
    <div className="container p-5">
      <img src={logo} alt="NMG logo" className="img-responsive" />
      <h1 className="text-secondary">Thank you for your response</h1>
      <p>
        You chose <span className="fw-bold fst-italic">{data[param_value].value}</span>
      </p>
      <p>
        {data[param_value].description}
      </p>
      <p>
        If you wish to make any specific comments or give us further information
        on your response, please enter it below:
      </p>
      <form onSubmit={e => handleSubmit(e)}>
        <div className="mb-3">
          <textarea 
            className="form-control" 
            cols="50" 
            rows="8" 
            onChange={e => set_Additional_Comment(e.target.value)}
          />
        </div>
        <button className="btn btn-nmg">Submit comment</button>
      </form>
    </div>
  );
}
