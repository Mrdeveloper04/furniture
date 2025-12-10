import type { Context, Config } from "@netlify/functions";

// Product data for the AI agent to reference
const PRODUCTS = [
  {
    id: "s1",
    name: "L-shape Corner Sofa",
    short: "Spacious family seating with storage chaise.",
    details:
      "Perfect for living rooms that host movie nights. High-back support, deep seats and hidden storage under the chaise. Ideal for 4-5 people.",
    price: "45,000 - 58,000",
    tags: ["Sectional", "Family", "Storage"]
  },
  {
    id: "s2",
    name: "Classic 3-Seater",
    short: "Minimal design, everyday comfort.",
    details:
      "Straight-line profile that works with any interior. Medium-firm cushioning for good posture and long sitting sessions.",
    price: "28,000 - 34,000",
    tags: ["3-Seater", "Minimal"]
  },
  {
    id: "s3",
    name: "Recliner Pair",
    short: "Two single recliners for your TV corner.",
    details:
      "Smooth manual recline, comfortable armrests and neck support. Great for gaming and long binge-watch sessions.",
    price: "38,000 - 46,000",
    tags: ["Recliner"]
  },
  {
    id: "s4",
    name: "Compact 2-Seater",
    short: "Made for studio and 1BHK layouts.",
    details:
      "Narrow armrests and compact depth save space while keeping seats comfortable. Works well with a small coffee table.",
    price: "20,000 - 25,000",
    tags: ["2-Seater", "Compact"]
  }
];

const SERVICES = [
  {
    name: "Custom sizing",
    desc:
      "Tailor seat depth, length and height so the sofa fits your room and comfort perfectly."
  },
  {
    name: "Free consultation",
    desc:
      "Share your room photos or visit the showroom to get layout and fabric suggestions."
  },
  {
    name: "Delivery & installation",
    desc:
      "Hassle-free delivery, assembly and placement by our in-house team within the city."
  },
  {
    name: "After-sales support",
    desc:
      "Cushion refilling, fabric care tips and repair support to keep your sofa fresh for years."
  }
];

const STORE_INFO = {
  name: "Sagar Sofas",
  tagline: "Comfort Crafted",
  location: "Showroom in City Center",
  hours: "Mon - Sun, 10 AM - 9 PM",
  features: [
    "Free parking",
    "Try before you buy",
    "10+ fabric options",
    "Solid-wood frames",
    "Custom sizes available"
  ],
  about:
    "Sagar Sofas is a local furniture studio focused on building sofas that balance comfort, durability and clean design. Each piece is assembled by trained craftsmen using kiln-dried wood, high-density foam and fabrics selected for Indian homes."
};

// AI response generation based on user query
function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // Greeting responses
  if (
    message.match(
      /^(hi|hello|hey|good morning|good afternoon|good evening|namaste)/i
    )
  ) {
    return `Hello! Welcome to Sagar Sofas. I'm here to help you find the perfect sofa for your home. You can ask me about:\n\n- Our sofa collection and prices\n- Product recommendations based on your needs\n- Store hours and location\n- Our services like custom sizing and delivery\n\nHow can I assist you today?`;
  }

  // Price-related queries
  if (
    message.includes("price") ||
    message.includes("cost") ||
    message.includes("how much") ||
    message.includes("budget") ||
    message.includes("expensive") ||
    message.includes("cheap") ||
    message.includes("affordable")
  ) {
    const priceList = PRODUCTS.map((p) => `- ${p.name}: Rs. ${p.price}`).join(
      "\n"
    );

    if (
      message.includes("budget") ||
      message.includes("cheap") ||
      message.includes("affordable") ||
      message.includes("low")
    ) {
      return `Looking for budget-friendly options? Our most affordable sofa is the **Compact 2-Seater** starting at Rs. 20,000.\n\nHere's our full price range:\n${priceList}\n\n*Prices vary based on fabric choice and customizations.*`;
    }

    return `Here are our current prices:\n\n${priceList}\n\n*Final prices depend on fabric selection and any custom sizing. Visit our showroom or ask for a personalized quote!*`;
  }

  // Product recommendations based on room size
  if (
    message.includes("small") ||
    message.includes("studio") ||
    message.includes("1bhk") ||
    message.includes("compact") ||
    message.includes("apartment")
  ) {
    const compact = PRODUCTS.find((p) => p.id === "s4");
    return `For smaller spaces like studios or 1BHK apartments, I recommend the **${compact?.name}**.\n\n${compact?.details}\n\n**Price:** Rs. ${compact?.price}\n\nIt's designed with narrow armrests and compact depth to maximize your space while maintaining comfort. Would you like to know more about fabric options?`;
  }

  if (
    message.includes("large") ||
    message.includes("big") ||
    message.includes("family") ||
    message.includes("living room") ||
    message.includes("spacious")
  ) {
    const lshape = PRODUCTS.find((p) => p.id === "s1");
    return `For larger living spaces and family use, I highly recommend the **${lshape?.name}**.\n\n${lshape?.details}\n\n**Price:** Rs. ${lshape?.price}\n\nIt comes with hidden storage in the chaise - perfect for blankets and cushions! Would you like to schedule a showroom visit to try it out?`;
  }

  // Recliner queries
  if (
    message.includes("recliner") ||
    message.includes("recline") ||
    message.includes("gaming") ||
    message.includes("tv") ||
    message.includes("movie")
  ) {
    const recliner = PRODUCTS.find((p) => p.id === "s3");
    return `For the ultimate relaxation experience, check out our **${recliner?.name}**!\n\n${recliner?.details}\n\n**Price:** Rs. ${recliner?.price}\n\nThese are perfect for your TV corner or gaming setup. The smooth manual recline lets you find your ideal position.`;
  }

  // 3-seater queries
  if (
    message.includes("3 seater") ||
    message.includes("three seater") ||
    message.includes("3-seater") ||
    message.includes("minimal") ||
    message.includes("simple")
  ) {
    const classic = PRODUCTS.find((p) => p.id === "s2");
    return `Our **${classic?.name}** is a timeless choice!\n\n${classic?.details}\n\n**Price:** Rs. ${classic?.price}\n\nIts minimal design complements any interior style. Perfect for everyday comfort with good posture support.`;
  }

  // L-shape queries
  if (
    message.includes("l-shape") ||
    message.includes("l shape") ||
    message.includes("sectional") ||
    message.includes("corner") ||
    message.includes("storage")
  ) {
    const lshape = PRODUCTS.find((p) => p.id === "s1");
    return `The **${lshape?.name}** is one of our most popular choices!\n\n${lshape?.details}\n\n**Price:** Rs. ${lshape?.price}\n\nIt features hidden storage under the chaise and can seat 4-5 people comfortably.`;
  }

  // All products query
  if (
    message.includes("all products") ||
    message.includes("collection") ||
    message.includes("catalog") ||
    message.includes("what do you sell") ||
    message.includes("what do you have") ||
    message.includes("show me")
  ) {
    const productList = PRODUCTS.map(
      (p) => `**${p.name}**\n${p.short}\nPrice: Rs. ${p.price}`
    ).join("\n\n");
    return `Here's our complete collection:\n\n${productList}\n\nWould you like detailed information about any specific sofa?`;
  }

  // Store hours and location
  if (
    message.includes("hour") ||
    message.includes("open") ||
    message.includes("timing") ||
    message.includes("when") ||
    message.includes("time")
  ) {
    return `**Store Hours:**\n${STORE_INFO.hours}\n\n**Location:** ${STORE_INFO.location}\n\nWe offer free parking and you can try any sofa before buying. Would you like directions or want to schedule a visit?`;
  }

  if (
    message.includes("location") ||
    message.includes("where") ||
    message.includes("address") ||
    message.includes("showroom") ||
    message.includes("visit")
  ) {
    return `**Visit Our Showroom:**\n${STORE_INFO.location}\n\n**Hours:** ${STORE_INFO.hours}\n\n**What we offer:**\n- Free parking\n- Try before you buy\n- Expert consultation\n\nYou can also share your room photos for personalized recommendations!`;
  }

  // Services queries
  if (
    message.includes("service") ||
    message.includes("delivery") ||
    message.includes("install") ||
    message.includes("custom") ||
    message.includes("support") ||
    message.includes("help")
  ) {
    const serviceList = SERVICES.map((s) => `**${s.name}:** ${s.desc}`).join(
      "\n\n"
    );
    return `We offer the following services:\n\n${serviceList}\n\nAll our services are designed to make your sofa buying experience hassle-free!`;
  }

  // Fabric queries
  if (
    message.includes("fabric") ||
    message.includes("material") ||
    message.includes("leather") ||
    message.includes("cloth") ||
    message.includes("upholstery")
  ) {
    return `We offer **10+ fabric options** including:\n\n- Stain-resistant fabrics (great for families with kids)\n- Easy-clean finishes\n- Leatherette options\n- Premium breathable upholstery\n\nAll our fabrics are specially selected for Indian homes. Visit our showroom to see and feel the materials in person!`;
  }

  // Quality queries
  if (
    message.includes("quality") ||
    message.includes("durable") ||
    message.includes("last") ||
    message.includes("warranty") ||
    message.includes("guarantee")
  ) {
    return `**Quality at Sagar Sofas:**\n\n- Kiln-dried solid wood frames\n- High-density foam cushioning\n- Deep cushioning that doesn't lose shape\n- Strong joinery for everyday use\n- Breathable upholstery\n\nWe also offer after-sales support including cushion refilling and fabric care tips to keep your sofa fresh for years!`;
  }

  // About the store
  if (
    message.includes("about") ||
    message.includes("who are you") ||
    message.includes("company") ||
    message.includes("sagar")
  ) {
    return `**About ${STORE_INFO.name}:**\n\n${STORE_INFO.about}\n\n**Why choose us?**\n- ${STORE_INFO.features.join(
      "\n- "
    )}\n\nWe're passionate about creating comfortable, durable furniture that makes your home feel warm and inviting!`;
  }

  // Recommendation request
  if (
    message.includes("recommend") ||
    message.includes("suggest") ||
    message.includes("best") ||
    message.includes("which one") ||
    message.includes("help me choose")
  ) {
    return `I'd be happy to help you find the perfect sofa! To give you the best recommendation, could you tell me:\n\n1. What's the size of your room? (small/medium/large)\n2. How many people will typically use the sofa?\n3. Any specific features you need? (storage, reclining, etc.)\n4. What's your budget range?\n\nShare any of these details and I'll suggest the ideal sofa for you!`;
  }

  // Thank you response
  if (message.includes("thank") || message.includes("thanks")) {
    return `You're welcome! It's my pleasure to help. If you have any more questions about our sofas or services, feel free to ask. Have a wonderful day! `;
  }

  // Goodbye response
  if (
    message.includes("bye") ||
    message.includes("goodbye") ||
    message.includes("see you")
  ) {
    return `Goodbye! Thank you for chatting with Sagar Sofas. We hope to see you at our showroom soon. Take care!`;
  }

  // Contact/Quote request
  if (
    message.includes("quote") ||
    message.includes("contact") ||
    message.includes("call") ||
    message.includes("phone") ||
    message.includes("email")
  ) {
    return `To get a personalized quote or reach us directly:\n\n1. **Fill out the contact form** on our website with your requirements\n2. **Visit our showroom** at ${STORE_INFO.location}\n3. **Showroom hours:** ${STORE_INFO.hours}\n\nOur team will get back to you with design options and pricing based on your specific needs!`;
  }

  // Default response for unrecognized queries
  return `I can help you with information about:\n\n- **Our Sofas:** Collection, prices, and recommendations\n- **Store Info:** Location, hours, and how to visit\n- **Services:** Custom sizing, delivery, and support\n- **Quality:** Materials, fabrics, and craftsmanship\n\nTry asking something like:\n- "What sofas do you have?"\n- "Which sofa is best for a small room?"\n- "What are your store hours?"\n- "Tell me about your services"\n\nHow can I help you find your perfect sofa?`;
}

export default async (req: Request, context: Context) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage || typeof userMessage !== "string") {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Generate AI response
    const response = generateResponse(userMessage.trim());

    return new Response(
      JSON.stringify({
        response,
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to process message" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

export const config: Config = {
  path: "/api/chat"
};
