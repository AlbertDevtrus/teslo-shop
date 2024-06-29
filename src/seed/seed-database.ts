import prisma from '../lib/prisma'

import { initialData } from "./seed";
import { countries } from "./seed-countries";

async function main() {
  
  await prisma.orderAddress.deleteMany();
  await prisma.orderItems.deleteMany();
  await prisma.order.deleteMany();
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.countries.deleteMany();
  
  const { categories, products, users } = initialData;

  await prisma.user.createMany({
    data: users
  })

  await prisma.countries.createMany({
    data: countries
  })

  const categoriesData = categories.map((name) => ({name}))

  await prisma.category.createMany({
    data: categoriesData
  })

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;

    return map;
  }, {} as Record<string, string>);

  products.forEach(async (product) => {
    const {type, images, ...rest} = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryID: categoriesMap[type]
      }
    })

    const imagesData = images.map(image => ({
      url: image,
      productID: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    });
  })


  console.log('Seed executed');
}

(() => {
  if(process.env.NODE_ENV === 'production') return;

  main();
})()