const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function categoryCreation() {
    try {

        await db.category.createMany({
            data: [
                {name: "CEOs"},
                {name: "Classic Experts"},
                {name: "Sales Experts"},
                {name: "Marketing Experts"},
                {name: "Finance Experts"},
                {name: "Operations Experts"},
                {name: "Human Resource Experts"},
                {name: "Technology Experts"},
                {name: "Design Experts"},
            ]
        })

    } catch (error) {
        console.error("Error seeding default categories", error);
    } finally {
        await db.$disconnect();
    }
}

categoryCreation();