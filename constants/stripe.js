const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
    ? 'pk_live_0F0Zdt1a6SYZfbcQ5tEqbMZq'
    : 'pk_test_0F0Zdt1a6SYZfbcQ5tEqbMZq';

export default STRIPE_PUBLISHABLE;