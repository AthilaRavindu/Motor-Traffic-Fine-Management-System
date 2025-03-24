import React from 'react';
// stripe
import {
    CardElement,
    AddressElement,
    CardCvcElement,
    AffirmMessageElement,
    AfterpayClearpayMessageElement,
    AuBankAccountElement,
    CardExpiryElement,
    CardNumberElement,
    CustomCheckoutProvider,
    EmbeddedCheckoutProvider,
    PaymentRequestButtonElement,
    PaymentMethodMessagingElement,
    PaymentElement,
    P24BankElement,
    LinkAuthenticationElement,
    IdealBankElement,
    IbanElement,
    FpxBankElement,
    ExpressCheckoutElement,
    EpsBankElement,
    EmbeddedCheckout,
    ElementsConsumer,
} from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            'color': '#32325d',
            'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
            'fontSmoothing': 'antialiased',
            'fontSize': '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};
const Address_ELEMENT_OPTIONS = {
    style: {
        base: {
            'color': '#32325d',
            'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
            'fontSmoothing': 'antialiased',
            'fontSize': '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};

export default function CardInput() {
    return (
        <div>
            <CardElement options={CARD_ELEMENT_OPTIONS}/>
            {/*<CardNumberElement/>
            <CardExpiryElement/>
            <CardCvcElement/>
            <AuBankAccountElement/>
            <P24BankElement/>
            <IdealBankElement/>*/}
        </div>
    )
        ;
}
