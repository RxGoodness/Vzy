import Stripe from "./Stripe";

export const CreateCustomer = async (
  email: string,
  source?: string,
) => {
  const customer = await Stripe.customers.create({
    email,
    description: "Vzy Customer",
    source,
  });

  return customer;
};

export const GetById = async (id: string) => {
  const customer = await Stripe.customers.retrieve(id);
  return customer;
};
