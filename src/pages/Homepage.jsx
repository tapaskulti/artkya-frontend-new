import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Header from "../components/Header";

import Home1 from "../assets/home1.webp";
import Home2 from "../assets/home2.jpg";
import Home3 from "../assets/home3.webp";
import Home4 from "../assets/home4.webp";

import Feature1 from "../assets/feature1.jpg";
import Feature2 from "../assets/feature2.jpg";
import Feature3 from "../assets/feature3.jpg";
// import Feature4 from "../assets/feature4.jpg";

import Collection1 from "../assets/collection1.jpg";
import Collection2 from "../assets/collection2.jpg";
import Collection3 from "../assets/collection3.jpg";

import Blank_Avatar from "../assets/Blank_Avatar.png";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const featuredArts = [
  {
    id: 1,
    title: "Sunset Dreams",
    artist: "Jane Doe",
    price: "$1,200",
    image: Feature1,
  },
  {
    id: 2,
    title: "Urban Rhythm",
    artist: "John Smith",
    price: "$950",
    image: Feature2,
  },
  {
    id: 3,
    title: "Serenity",
    artist: "Emma Johnson",
    price: "$1,500",
    image: Feature3,
  },
];

// const featuredCollections = [
//   {
//     id: 1,
//     title: "Acrylic Oil Paintings",
//     artist: "Jane Doe",
//     price: "$1,200",
//     image: Collection1,
//   },
//   {
//     id: 2,
//     title: "Urban Rhythm",
//     artist: "John Smith",
//     price: "$950",
//     image: Collection2,
//   },
//   {
//     id: 3,
//     title: "Serenity",
//     artist: "Emma Johnson",
//     price: "$1,500",
//     image: Collection3,
//   },
// ];

// const artworks = [
//   {
//     id: 1,
//     title: "Sunset Dreams",
//     artist: "Jane Doe",
//     price: "$1,200",
//     image: "/placeholder.svg?height=400&width=300&text=Artwork+1",
//   },
//   {
//     id: 2,
//     title: "Urban Rhythm",
//     artist: "John Smith",
//     price: "$950",
//     image: "/placeholder.svg?height=400&width=300&text=Artwork+2",
//   },
//   {
//     id: 3,
//     title: "Serenity",
//     artist: "Emma Johnson",
//     price: "$1,500",
//     image: "/placeholder.svg?height=400&width=300&text=Artwork+3",
//   },
//   {
//     id: 4,
//     title: "Abstract Thoughts",
//     artist: "Michael Brown",
//     price: "$800",
//     image: "/placeholder.svg?height=400&width=300&text=Artwork+4",
//   },
//   {
//     id: 5,
//     title: "Nature's Embrace",
//     artist: "Sarah Lee",
//     price: "$1,100",
//     image: "/placeholder.svg?height=400&width=300&text=Artwork+5",
//   },
//   {
//     id: 6,
//     title: "City Lights",
//     artist: "David Wilson",
//     price: "$1,300",
//     image: "/placeholder.svg?height=400&width=300&text=Artwork+6",
//   },
//   {
//     id: 7,
//     title: "Ocean Whispers",
//     artist: "Emily Chen",
//     price: "$950",
//     image: "/placeholder.svg?height=400&width=300&text=Artwork+7",
//   },
//   {
//     id: 8,
//     title: "Mountain Majesty",
//     artist: "Robert Taylor",
//     price: "$1,400",
//     image: "/placeholder.svg?height=400&width=300&text=Artwork+8",
//   },
// ];

const carouselImages = [Home1, Home2, Home3, Home4];

const Homepage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const { randArtAndArtist } = useSelector((state) => state.artist);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prevImage) =>
        (prevImage - 1 + carouselImages.length) % carouselImages.length
    );
  };

  const nextArtworks = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + 1, randArtAndArtist?.artworks.length - 4)
    );
  };

  const prevArtworks = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Hero Section with Carousel */}
      <section className="relative h-[600px] overflow-hidden group">
        {carouselImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Artwork ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Discover Unique Art
            </h2>
            <p className="text-xl md:text-2xl text-white mb-8">
              Find the perfect piece for your space
            </p>
            <a
              href="/Painting"
              className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
            >
              Explore Painting
            </a>
          </div>
        </div>
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
        >
          <FaChevronLeft className="h-6 w-6 text-gray-800" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
        >
          <FaChevronRight className="h-6 w-6 text-gray-800" />
        </button>
      </section>

      {/* Featured Artworks */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured Artworks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArts?.map((artwork) => (
              <div
                key={artwork.id}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="aspect-square bg-white relative overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-in-out transform group-hover:scale-125"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-600 mb-4">by {artwork.artist}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-800">
                      {artwork.price}
                    </span>
                    <a
                      href="#"
                      className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured Collections
          </h2>
          <div className="grid grid-cols-2 gap-9">
            <div className="">
              <div className="bg-white overflow-hidden group">
                <img
                  src={Collection1}
                  alt=""
                  className="inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-in-out transform group-hover:scale-125"
                />
              </div>
              <div className="bg-white overflow-hidden mt-9 group">
                <img
                  src={Collection3}
                  alt=""
                  className="inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-in-out transform group-hover:scale-125"
                />
              </div>
            </div>

            <div className="bg-white overflow-hidden group">
              <img
                src={Collection2}
                alt=""
                className="inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-in-out transform group-hover:scale-125"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src={
                  randArtAndArtist?.artist?.profileImage?.secure_url
                    ? randArtAndArtist?.artist?.profileImage?.secure_url
                    : Blank_Avatar
                }
                alt={Blank_Avatar}
                className="rounded-full w-64 h-64 object-cover mx-auto"
              />
            </div>
            <div className="md:w-1/2">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  About the Artist
                </h2>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {randArtAndArtist?.artist?.name || "Unknown Artist"}
                </h2>
              </div>
              <div className="h-48 mb-4 overflow-auto stylish-scrollbar">
                <p className="text-gray-600">
                  {isExpanded
                    ? randArtAndArtist?.artist?.aboutMe ||
                      "This artist has not provided a description."
                    : `${
                        randArtAndArtist?.artist?.aboutMe?.slice(0, 200) ||
                        "No description available."
                      }...`}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-500 font-semibold hover:text-blue-600 transition duration-300"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
                <Link
                  to={`/ArtistProfilePage/${randArtAndArtist?.artist?.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
                >
                  See Artist Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist's Works Carousel */}
      {randArtAndArtist?.artworks?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Artist Works
            </h2>
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${startIndex * (100 / 4)}%)`,
                  }}
                >
                  {randArtAndArtist?.artworks?.map((artwork) => (
                    <div
                      key={artwork._id}
                      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-2"
                    >
                      <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                          src={artwork?.thumbnail?.secure_url}
                          alt={artwork?.title || "Untitled Artwork"}
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {artwork.title || "Untitled"}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            by{" "}
                            {randArtAndArtist?.artist?.name || "Unknown Artist"}
                          </p>
                          <p className="text-lg font-bold text-gray-800">
                            {artwork.price || "Price Not Available"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={prevArtworks}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
                disabled={startIndex === 0}
              >
                <FaChevronLeft className="h-10 w-10 text-gray-800" />
              </button>
              <button
                onClick={nextArtworks}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
                disabled={startIndex >= randArtAndArtist?.artworks?.length - 4}
              >
                <FaChevronRight className="h-10 w-10 text-gray-800" />
              </button>
            </div>
          </div>
<<<<<<< HEAD
        </div>
      </section>
      
      <Footer />
=======
        </section>
      )}

      {/* <Footer /> */}
>>>>>>> f68484647a354087cde0da46e1dcf86513ded497
    </div>
  );
};

export default Homepage;
