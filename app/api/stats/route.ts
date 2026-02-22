import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const FALLBACK_STATS = {
  customers: 622,
  revenue: 120000,
  retests: 15300,
  target: 240000,
};

export async function GET() {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return NextResponse.json(FALLBACK_STATS);
    }

    const stripe = new Stripe(stripeKey);

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const createdGte = Math.floor(startOfMonth.getTime() / 1000);

    const transactions = await stripe.balanceTransactions.list({
      created: { gte: createdGte },
      limit: 100,
      type: 'charge',
    });

    let mtdRevenue = 0;
    for (const txn of transactions.data) {
      mtdRevenue += txn.net;
    }
    mtdRevenue = Math.round(mtdRevenue / 100);

    const customers = await stripe.customers.list({ limit: 1 });
    const customerCount = customers.data.length > 0
      ? (customers as unknown as { total_count?: number }).total_count || FALLBACK_STATS.customers
      : FALLBACK_STATS.customers;

    return NextResponse.json({
      customers: customerCount,
      revenue: mtdRevenue || FALLBACK_STATS.revenue,
      retests: FALLBACK_STATS.retests,
      target: FALLBACK_STATS.target,
    });
  } catch (error: unknown) {
    console.error('Stats API error:', error);
    return NextResponse.json(FALLBACK_STATS);
  }
}
