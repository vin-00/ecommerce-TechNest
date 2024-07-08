import { NextResponse } from "next/server"
const stripe = require('stripe')(process.env.NEXT_STRIPE_SECRET_KEY);

export const POST = async (request:any) => {

  const { products } = await request.json();
  let activeProducts = await stripe.products.list({active:true});
//   console.log(activeProducts)

  try {
       for(const product of products){
         const matchedProducts = activeProducts?.data?.find((stripeProduct:any)=>
               stripeProduct.name.toLowerCase() === product.name.toLowerCase()
         )
   
        if(matchedProducts == undefined){
           const prod = await stripe.products.create({
             name: product.name,
             default_price_data:{
               currency:'inr',
               unit_amount:product.price*100
             }
           })
         }
   
       }
  } catch (error) {
      console.log("Error in creating a new product", error);
      throw error;
  }
 
    activeProducts = await stripe.products.list({active:true});
    let stripeProducts =  []

    for(const product of products){
      const stripeProduct = activeProducts?.data?.find((stripeProduct:any)=>
        stripeProduct.name.toLowerCase() === product.name.toLowerCase()
      );

      if(stripeProduct){
        stripeProducts.push(
          {
            price: stripeProduct?.default_price,
            quantity: product.quantity,
          },
        )
      }
    }


      const session = await stripe.checkout.sessions.create({
        line_items:stripeProducts,
        mode: 'payment',
        success_url: `https://ecommerce-tech-nest.vercel.app/success`,
        cancel_url: `https://ecommerce-tech-nest.vercel.app/`,
      });
      
    return NextResponse.json({
        url: session.url
    })
}
