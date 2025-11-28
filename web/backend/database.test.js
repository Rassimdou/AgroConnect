import prisma from './prisma/client.js';

async function testDatabase() {
  try {
    console.log('\n🧪 Starting Database Tests...\n');

    // 1. Test Producer Creation
    console.log('1️⃣ Testing Producer Creation...');
    const producer = await prisma.producer.create({
      data: {
        fullname: "Ahmed Bensaid",
        email: "ahmed@demo.com",
        password: "hashedPassword123",
        phone_number: "+213 555 123 456",
        location: "Algiers",
        domain: "Vegetables",
        verified_status: "verified",
      },
    });
    console.log('✅ Producer created:', producer);

    // 2. Test Product Creation
    console.log('\n2️⃣ Testing Product Creation...');
    const product = await prisma.product.create({
      data: {
        name: "Fresh Tomatoes",
        price: 250,
        quantity_available: 100,
        description: "Fresh, organic tomatoes",
        category: "Vegetables",
        producer_id: producer.id,
        state: "approved_by_ai",
      },
    });
    console.log('✅ Product created:', product);

    // 3. Test Get All Products
    console.log('\n3️⃣ Testing Get All Products...');
    const allProducts = await prisma.product.findMany({
      include: {
        producer: true,
      },
    });
    console.log(`✅ Found ${allProducts.length} products:`, allProducts);

    // 4. Test Get Producer with Products
    console.log('\n4️⃣ Testing Get Producer with Products...');
    const producerWithProducts = await prisma.producer.findUnique({
      where: { id: producer.id },
      include: { products: true },
    });
    console.log('✅ Producer with products:', producerWithProducts);

    // 5. Test Product Update
    console.log('\n5️⃣ Testing Product Update...');
    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: {
        price: 300,
        quantity_available: 80,
      },
    });
    console.log('✅ Product updated:', updatedProduct);

    // 6. Test Create Multiple Products
    console.log('\n6️⃣ Testing Create Multiple Products...');
    const multipleProducts = await prisma.product.createMany({
      data: [
        {
          name: "Fresh Lettuce",
          price: 150,
          quantity_available: 50,
          description: "Green lettuce",
          category: "Vegetables",
          producer_id: producer.id,
          state: "approved_by_ai",
        },
        {
          name: "Carrots",
          price: 120,
          quantity_available: 75,
          description: "Orange carrots",
          category: "Vegetables",
          producer_id: producer.id,
          state: "approved_by_ai",
        },
      ],
    });
    console.log(`✅ ${multipleProducts.count} products created`);

    // 7. Test Filter Products by Category
    console.log('\n7️⃣ Testing Filter Products by Category...');
    const vegetableProducts = await prisma.product.findMany({
      where: {
        category: "Vegetables",
      },
      include: { producer: true },
    });
    console.log(`✅ Found ${vegetableProducts.length} vegetable products:`, vegetableProducts);

    // 8. Test Database Statistics
    console.log('\n8️⃣ Testing Database Statistics...');
    const producerCount = await prisma.producer.count();
    const productCount = await prisma.product.count();
    console.log(`✅ Database Stats:`, {
      producers: producerCount,
      products: productCount,
    });

    // 9. Test Pagination
    console.log('\n9️⃣ Testing Pagination...');
    const paginatedProducts = await prisma.product.findMany({
      skip: 0,
      take: 2,
      include: { producer: true },
    });
    console.log(`✅ First 2 products (pagination):`, paginatedProducts);

    // 10. Test Product Deletion
    console.log('\n🔟 Testing Product Deletion...');
    const deletedProduct = await prisma.product.delete({
      where: { id: product.id },
    });
    console.log('✅ Product deleted:', deletedProduct);

    console.log('\n✨ All tests completed successfully!\n');

  } catch (error) {
    console.error('❌ Error during testing:', error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
