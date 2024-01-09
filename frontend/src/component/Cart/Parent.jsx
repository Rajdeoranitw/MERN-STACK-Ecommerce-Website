import React, { useEffect, useState } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from "./Payment";
import axios from "axios";


const ParentComponent = () => {

    const [stripeApiKey, setStripeApiKey] = useState("");


    async function getStripApiKey() {
        const { data } = await axios.get("/api/v1/stripeapikey");
        setStripeApiKey(data.stripeApiKey);

    }

    useEffect(() => {
        getStripApiKey();

    }, [])
    


    return (<Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
    </Elements>
    )
};


export default ParentComponent;
