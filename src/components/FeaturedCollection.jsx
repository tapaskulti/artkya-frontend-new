import Collection1 from "../assets/collection1.jpg"
import Collection2 from "../assets/collection2.jpg"
import Collection3 from "../assets/collection3.jpg"


const featuredCollections = [
    {
      id: 1,
      title: "Acrylic Oil Paintings",
      artist: "Jane Doe",
      price: "$1,200",
      image: Collection1,
    },
    {
      id: 2,
      title: "Urban Rhythm",
      artist: "John Smith",
      price: "$950",
      image: Collection2,
    },
    {
      id: 3,
      title: "Serenity",
      artist: "Emma Johnson",
      price: "$1,500",
      image: Collection3,
    },
  ];

const featuredCollections = ({ featuredCollections }) => {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side */}
            <div className="lg:col-span-2 grid grid-rows-2 gap-4">
              {/* Top Left Image */}
              <div className="relative overflow-hidden h-[400px]">
                <img
                  src={featuredCollections[0]?.image}
                  alt={featuredCollections[0]?.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">
                    {featuredCollections[0]?.title}
                  </span>
                </div>
              </div>
              {/* Bottom Left Images */}
              <div className="grid grid-cols-2 gap-4">
                {featuredCollections.slice(1, 3).map((fcollection) => (
                  <div
                    key={fcollection.id}
                    className="relative overflow-hidden h-[200px]"
                  >
                    <img
                      src={fcollection.image}
                      alt={fcollection.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-lg font-bold">
                        {fcollection.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right Side (Large Image) */}
            <div className="relative overflow-hidden h-[700px]">
              <img
                src={featuredCollections[3]?.image}
                alt={featuredCollections[3]?.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {featuredCollections[3]?.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default featuredCollections;
  