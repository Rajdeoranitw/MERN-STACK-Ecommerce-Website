import { Step, StepLabel, Typography, Stepper } from '@material-ui/core';
import React, { Fragment } from 'react';
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutSteps.css";


const CheckoutSteps = ({ activeStep }) => {


    const steps = [
        {
            lable: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            lable: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />,
        },
        {
            lable: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
    };





    return (
        <Fragment>
            <Stepper alternativeLable activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step key={index} active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}  >
                        <StepLabel
                            style={{ color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)", }}
                            icon={item.icon}

                        >
                            {item.lable}
                        </StepLabel>

                    </Step>
                ))}

            </Stepper>
        </Fragment>
    )
}

export default CheckoutSteps