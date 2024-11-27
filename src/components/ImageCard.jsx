import { FaHeart, FaPlus, FaShoppingCart } from "react-icons/fa";

export const ImageCard = ({
    image,
    artist,
    country,
    height,
    width,
    depth,
    price,
    name,
  }) => {
    const dimensions = `${height} x ${width} x ${depth} in`;
    // const navigate = useNavigate();
  
    const handleImageClick = () => {
      // Navigate to the details page
      // navigate(`/image/${name.replace(/\s+/g, '-').toLowerCase()}`);
    };
  
    return (
      <div className="w-full max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
        <div className="relative overflow-hidden h-64 group">
          <img
            src={image}
            alt={`${artist} - Painting`}
            className="w-full h-full object-cover transform transition-transform duration-[2000ms] ease-in-out group-hover:scale-125 cursor-pointer"
            // onClick={handleImageClick}
          />
          <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="bg-white rounded-full p-2 shadow-lg transition-transform transform hover:scale-110"
              aria-label="Add to collection"
            >
              <FaPlus className="text-gray-600 hover:text-blue-500" />
            </button>
            <button
              className="bg-white rounded-full p-2 shadow-lg transition-transform transform hover:scale-110"
              aria-label="Add to favourites"
            >
              <FaHeart className="text-gray-600 hover:text-red-500" />
            </button>
            <button
              className="bg-white rounded-full p-2 shadow-lg transition-transform transform hover:scale-110"
              aria-label="Add to cart"
            >
              <FaShoppingCart className="text-gray-600 hover:text-green-500" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div className="w-3/4">
              <h2
                className="text-lg font-semibold text-gray-800 mb-1 truncate"
                title={name} // Tooltip shows the full name on hover
              >
                {name}
              </h2>
              <p className="text-sm text-gray-500 mb-1">{artist}</p>
              <p className="text-sm text-gray-500 mb-1">{country}</p>
              <p className="text-xs text-gray-400 mb-4">{dimensions}</p>
            </div>
            <div className="text-lg font-medium w-1/4 text-right">${price}</div>
          </div>
        </div>
      </div>
    );
  };
  