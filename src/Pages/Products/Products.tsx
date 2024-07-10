import ProductCard from "@/components/ProductCard/ProductCard";

const Products = () => {
    const products = [
      {
        _id: "668c0d900e26fe0b10f741c3",

        title: "Red Geranium",
        price: 200,
        rating: 4.4,
        image:
          "https://thumbs.dreamstime.com/b/flower-pot-sunny-garden-18371035.jpg?w=768",
        description:
          "Red Geranium is an herbaceous evergreen perennial with an upright spreading habit of growth. Its medium texture blends into the garden, but can always be balanced by a couple of finer or coarser plants for an effective composition. This plant will require occasional maintenance and upkeep",
        isDeleted: false,
        category: "category Name",
        brand: "brand-1",
        stock: 20,
      },
      {
        _id: "668c0f220e26fe0b10f741c6",

        title: "Blue Hydrangea",
        price: 300,
        rating: 4,
        image:
          "https://thumbs.dreamstime.com/b/beautiful-blue-hydrangea-flower-pot-39530471.jpg?w=768",
        description:
          "Blue Hydrangeas are some of the most sought-after flowering shrubs due to their incredible blooms and versatile nature. One of their unique aspects is their ability to change color, especially shifting from pink to mesmerizing shades of blue. Here you'll discover several varieties of hydrangeas that will produce gorgeous blue flowers. Plus you'll get tips for how to achieve this feat effectively. ",
        isDeleted: false,
        brand: "brand-2",
        category: "balakhane",
        stock: 25,
      },
      {
        _id: "668c0f220e26fe0b10f741c6",

        title: "Blue Hydrangea",
        price: 300,
        rating: 4,
        image:
          "https://thumbs.dreamstime.com/b/beautiful-blue-hydrangea-flower-pot-39530471.jpg?w=768",
        description:
          "Blue Hydrangeas are some of the most sought-after flowering shrubs due to their incredible blooms and versatile nature. One of their unique aspects is their ability to change color, especially shifting from pink to mesmerizing shades of blue. Here you'll discover several varieties of hydrangeas that will produce gorgeous blue flowers. Plus you'll get tips for how to achieve this feat effectively. ",
        isDeleted: false,
        brand: "brand-2",
        category: "balakhane",
        stock: 25,
      },
      {
        _id: "668c0f220e26fe0b10f741c6",

        title: "Blue Hydrangea",
        price: 300,
        rating: 4,
        image:
          "https://thumbs.dreamstime.com/b/beautiful-blue-hydrangea-flower-pot-39530471.jpg?w=768",
        description:
          "Blue Hydrangeas are some of the most sought-after flowering shrubs due to their incredible blooms and versatile nature. One of their unique aspects is their ability to change color, especially shifting from pink to mesmerizing shades of blue. Here you'll discover several varieties of hydrangeas that will produce gorgeous blue flowers. Plus you'll get tips for how to achieve this feat effectively. ",
        isDeleted: false,
        brand: "brand-2",
        category: "balakhane",
        stock: 25,
      },
    ];
    return (
      <div className="py-10">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center text-slate-700">
            Populler of our products
          </h2>
        </div>
        <div className="lg:my-10 my-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
};

export default Products;