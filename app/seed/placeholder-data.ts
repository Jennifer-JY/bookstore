import bcrypt from "bcryptjs";

export const books = [
  {
    id: "dfdc5b55-3b13-4037-b38e-00cbcb5a6f4d",
    title: "50 Healthy Lunch Recipes",
    author: "Natalie Greaves",
    genre: "non-fiction",
    stock: 1,
    price: 29,
    stripe_product_id: "prod_SJr69EoUu0rWBP",
    stripe_price_id: "price_1RPDOhP3Rm3FImXPKVyuma6V",
  },
  {
    id: "7a398b1f-63b4-4e5f-a022-61f6e3d8d0f2",
    title: "The Paper Silence",
    author: "Clara Wren",
    genre: "fiction",
    stock: 10,
    price: 19,
    stripe_product_id: "prod_SJrEuLAUX2gTCW",
    stripe_price_id: "price_1RPDVtP3Rm3FImXP76Lzf4sK",
  },
  {
    id: "016c0b3e-9a9f-44b0-bb12-9f9d11f0102b",
    title: "Flesh and Iron",
    author: "Elias Thorn",
    genre: "fiction",
    stock: 13,
    price: 12.5,
    stripe_product_id: "prod_SJrG0QKVvtqTsA",
    stripe_price_id: "price_1RPDXsP3Rm3FImXP6mwDYyDI",
  },
  {
    id: "4d4a6c9e-9b6a-4902-a981-6f8f84bb5c33",
    title: "The Pause Between Words",
    author: "Dr. Alina Veras",
    genre: "non-fiction",
    stock: 1,
    price: 29,
    stripe_product_id: "prod_SJrIl05yXu6nDk",
    stripe_price_id: "price_1RPDZcP3Rm3FImXPbpmYrhe2",
  },
  {
    id: "43b1c0d6-cf6a-41c6-9d77-5e499706cb58",
    title: "Rewriting the Script: How Childhood Narratives Shape Adult Lives",
    author: "Dr. Alina Veras",
    genre: "non-fiction",
    stock: 4,
    price: 22,
    stripe_product_id: "prod_SJrK08v9nOImYA",
    stripe_price_id: "price_1RPDbrP3Rm3FImXPSHCxNAkN",
  },
  {
    id: "a2ae4de6-823f-44d1-b0d5-d3b71939eb3f",
    title: "Digital Hunger",
    author: "Serena Kwan",
    genre: "non-fiction",
    stock: 4,
    price: 21,
    stripe_product_id: "prod_SJrLsO8ulXaBDk",
    stripe_price_id: "price_1RPDcbP3Rm3FImXPjN7m1H2M",
  },
  {
    id: "d1e01330-b75c-4321-8793-4a9aa8577267",
    title: "Almost Human: What AI Teaches Us About Ourselves",
    author: "Theo Malik",
    genre: "non-fiction",
    stock: 4,
    price: 18,
    stripe_product_id: "prod_SJrMirqIPvTqay",
    stripe_price_id: "price_1RPDdXP3Rm3FImXPasGnS0la",
  },
  {
    id: "63b6fe73-d9ee-4f0b-a493-22cc00e99931",
    title: "The Year I Forgot to Prove Myself",
    author: "Lillian Mok",
    genre: "non-fiction",
    stock: 4,
    price: 17,
    stripe_product_id: "prod_SJrNZJBeLb29oF",
    stripe_price_id: "price_1RPDeIP3Rm3FImXPxBktcE0B",
  },
  {
    id: "2ec7ae62-8cc3-4fcf-a11b-29668c77a44e",
    title: "Dust on the Blueprint: Why We Build Lives We Don’t Actually Want",
    author: "Jonah Reeve",
    genre: "non-fiction",
    stock: 4,
    price: 18,
    stripe_product_id: "prod_SJrNjXVF1MvkOU",
    stripe_price_id: "price_1RPDf8P3Rm3FImXPptdErfFy",
  },
  {
    id: "9972759f-70c7-46f3-8fa1-95aeed8051c4",
    title: "To Swallow the Moon",
    author: "Lila Okoye",
    genre: "fiction",
    stock: 4,
    price: 15,
    stripe_product_id: "prod_SJrOeSRnRg2TEb",
    stripe_price_id: "price_1RPDfrP3Rm3FImXPwb7EQo4h",
  },
  {
    id: "5471b5b5-e1c4-481b-9083-29610128db16",
    title: "What We Buried Under Snow",
    author: "Theo Malik",
    genre: "fiction",
    stock: 4,
    price: 17,
    stripe_product_id: "prod_SJrQw4tlaR0gll",
    stripe_price_id: "price_1RPDhSP3Rm3FImXP7fX0I2dS",
  },
  {
    id: "b188d56c-32d0-4b2f-8207-37c7e3fd5f63",
    title: "Unrendered",
    author: "Samira Clay",
    genre: "fiction",
    stock: 4,
    price: 18,
    stripe_product_id: "prod_SJrQKI6VXN0WbY",
    stripe_price_id: "price_1RPDi2P3Rm3FImXP3iFmIXIr",
  },
];

export const bookDetails = [
  {
    book_id: books[0].id,
    published_date: "2023-06-07",
    introduction:
      "Delicious, energizing lunches made simple. This book offers 50 wholesome recipes—from vibrant salads and hearty wraps to nourishing bowls and soups—designed to fuel your day without the fuss. Perfect for busy lives, with easy ingredients, helpful tips, and something for every diet.",
  },
  {
    book_id: books[1].id,
    published_date: "2023-06-07",
    introduction:
      "A haunting exploration of the words left unsaid. The Paper Silence weaves a quiet, powerful tale of memory, regret, and the fragile threads that connect us. Through letters never sent and pages never read, it captures the ache of what we hold back—and what still lingers in the silence.",
  },
  {
    book_id: books[2].id,
    published_date: "2023-06-07",
    introduction:
      "Where humanity meets the machine. Flesh and Iron is a gripping tale of survival, identity, and rebellion in a world where technology and biology blur. As the line between man and metal fades, one soul must decide what it truly means to be alive.",
  },
  {
    book_id: books[3].id,
    published_date: "2023-06-07",
    introduction:
      "In the spaces where language falters, truth emerges. The Pause Between Words is a quiet, introspective journey through connection, miscommunication, and the unspoken moments that speak the loudest.",
  },
  {
    book_id: books[4].id,
    published_date: "2023-06-07",
    introduction:
      "The stories we tell ourselves often begin long before we understand them. Rewriting the Script explores how childhood experiences shape our beliefs, behaviors, and identities in adulthood—and how we can consciously reshape those inner narratives to live with greater clarity, freedom, and self-compassion.",
  },
  {
    book_id: books[5].id,
    published_date: "2023-06-07",
    introduction:
      "Always connected, yet never satisfied. Digital Hunger dives into our relentless craving for validation, stimulation, and meaning in an online world. A compelling look at how technology feeds our desires—and what it costs us to stay constantly fed.",
  },
  {
    book_id: books[6].id,
    published_date: "2023-06-07",
    introduction:
      "As we teach machines to think, they hold up a mirror to the minds that made them. Almost Human explores how artificial intelligence not only reshapes our world, but also reveals the deepest truths—and blind spots—about what it means to be human.",
  },
  {
    book_id: books[7].id,
    published_date: "2023-06-07",
    introduction:
      "In a world obsessed with achievement, stepping back can feel like falling behind. The Year I Forgot to Prove Myself is a raw, honest journey through burnout, self-worth, and the quiet power of simply being. It’s about losing your drive—and finding something deeper.",
  },
  {
    book_id: books[8].id,
    published_date: "2023-06-07",
    introduction:
      "We follow the plan—school, job, success—only to find ourselves lost in lives that don’t feel like our own. Dust on the Blueprint uncovers how cultural scripts, childhood conditioning, and silent expectations shape the lives we build, and asks: what happens when we stop and question the design?",
  },
  {
    book_id: books[9].id,
    published_date: "2023-06-07",
    introduction:
      "A story of longing, transformation, and the hunger for something just out of reach. To Swallow the Moon is a poetic journey through dreams, desire, and the shadows we carry—where the line between myth and memory begins to blur.",
  },
  {
    book_id: books[10].id,
    published_date: "2023-06-07",
    introduction:
      "Some memories don’t melt—they wait. What We Buried Under Snow is a haunting exploration of love, loss, and the quiet weight of the past. As long-forgotten truths resurface, the question becomes: what are we really trying to forget?",
  },
  {
    book_id: books[11].id,
    published_date: "2023-06-07",
    introduction:
      "Before the final image appears, there’s a mess of code, chaos, and possibility. Unrendered is a story of identity in flux—a meditation on creativity, control, and the raw, unfinished moments that shape who we become.",
  },
];

export const users = [
  {
    email: "123@gmail.com",
    password: bcrypt.hashSync("bacon123", 10),
  },
  {
    email: "456@gmail.com",
    password: bcrypt.hashSync("apple123", 10),
  },
];
