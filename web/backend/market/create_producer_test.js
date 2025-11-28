import prisma from '../prisma/client.js'; // adjust path if needed

async function main() {
  try {
    const producer = await prisma.producer.create({
      data: {
        fullname: "Test Producer",
        email: "test@example.com",
        password: "password123", // in real app, hash passwords
        phone_number: "1234567890",
        location: "Test City",
        domain: "Fruits",
        verified_status: "unverified"
      },
    });

    console.log("Producer created successfully:", producer);
  } catch (error) {
    console.error("Error creating producer:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
