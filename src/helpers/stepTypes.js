export const types = {
    ORDER_FORM: 1,
    UPSELL: 2,
    TYP: 3,
    DOWNSELL: 4,
    OPTIN: 5,
}

export default {
    [types.ORDER_FORM]: {
        id: 1,
        icon: 'shopping-cart',
        title: 'Checkout',
        info: 'Ideal for taking the initial payment from customers through a <b>payment form</b> or a <b>two step form</b>.',
    },
    [types.UPSELL]: {
        id: 2,
        icon: 'sale',
        title: 'Upsell',
        info: 'Allows your customers to buy more of your products without having to provide their payment details again.'
    },
    [types.TYP]: {
        id: 3,
        icon: 'check-circle',
        title: 'Thank you',
        info: 'This is usually the last page customers will see in your funnel, also a chance to show more of your other products.',
    },
    [types.DOWNSELL]: {
        id: 4,
        icon: 'sale',
        title: 'Downsell',
        info: 'This step is only shown to your customers when they say <b>NO</b> to a previous Upsell offer.',
    },
    [types.OPTIN]: {
        id: 5,
        icon: 'target',
        title: 'Landing',
        info: 'Ideal for landing pages, regardless of whether you collect optins or not.'
    },
}


