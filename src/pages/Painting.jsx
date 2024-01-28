import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

// import { Link } from "react-router-dom";
import Img1 from "../assets/Img1.jpg";
import Img3 from "../assets/img3.jpg";
import Img14 from "../assets/img14.jpg";
import Img6 from "../assets/img6.jpg";
import Img8 from "../assets/img8.jpg";
import Img9 from "../assets/img9.jpg";
import Img12 from "../assets/img12.jpg";

import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import Accordion from "../components/Accordion";

// import ArtItem from "../components/ArtItem";

const Painting = () => {
  const [toggleHide, setToggleHide] = useState(false);

  const newstyleElement = styleElement.slice(0, 3);
  const [buttonText, setButtonText] = useState("read more");

  function handleClick() {
    if (!toggleHide) {
      setButtonText("hide");
    } else {
      setButtonText("read more");
    }
    setToggleHide(!toggleHide);
  }

  // const body = [{
  //   title:"STYLE",
  //   element: [
  //     "Abstract",
  //     "Fine Art",
  //     "Modern",
  //     "Abstract Expressionism",
  //     "Figurative",
  //     "Impressionism",
  //     "Realism",
  //     "Conceptual",
  //     "Minimalism",
  //     "Pop Art",
  //     "Pop Art",
  //     "Portraiture",
  //     "Surrealism",
  //     "Art Deco",
  //     "Illustration",
  //     "Street Art",
  //     "Photorealism",
  //     "Cubism",
  //     "Folk",
  //     "Documentary",
  //     "Dada",
  //   ]
  // },{
  //   title:"SUBJECT",
  //   element: [
  //     "Abstract",
  //   "Landscape",
  //   "Portrait",
  //   "People",
  //   "Animal",
  //   "floral",
  //   "Nature",
  //   "women",
  //   "Still Life",
  //   "Seascape",
  //   "Fantasy",
  //   "Cities",
  //   "Architecture",
  //   "Body",
  //   "Botanic",
  //   "Beach",
  //   "Geometric",
  //   "Love",
  //   "Culture",
  //   "Men",
  //   "Pop Culture/Celebrity",
  //   "Erotic",
  //   "World Culture",
  //   "Children",
  //   "Music",
  //   "Religious",
  //   "Popular culture",
  //   "Classical mythology",
  //   "Garden",
  //   "Interiors",
  //   "Places",
  //   "Tree",
  //   "Celebrity",
  //   "Water",
  //   "Boat",
  //   "Horse",
  //   "Food",
  //   "Fashion",
  //   "Political",
  //   "Performing Arts",
  //   "Religion",
  //   "Fish",
  //   "Graffiti",
  //   "Outer Space",
  //   "Mortality",
  //   "Calligraphy",
  //   "Cats",
  //   "Family",
  //   "Aerial",
  //   "Dogs",
  //   "Food & Drink",
  //   "Light",
  //   "Cartoon",
  //   "Home",
  //   "Travel",
  //   "Humor",
  //   "Sailboat",
  //   "Cinema",
  //   "Rural life",
  //   "Seasons",
  //   "Sport",
  //   "Patterns",
  //   "Car",
  //   "Sports",
  //   "Time",
  //   "Automobile",
  //   "Kids",
  //   "Comics",
  //   "Science/Technology",
  //   "Politics",
  //   "Language",
  //   "Health & Beauty",
  //   "Science",
  //   "Ship",
  //   "Typography",
  //   "Transportation",
  //   "Bicycle",
  //   "Business",
  //   "Airplane",
  //   "Technology",
  //   "Wall",
  //   "Cows",
  //   "Cuisine",
  //   "Train",
  //   "Education",
  //   "Aeroplane",
  //   "Yacht",
  //   "Kitchen",
  //   "Motorcycle",
  //   "Bike",
  //   "Motorbike",
  //   "Motor",
  //   ]
  // }]
  const styleElement = [
    {
      title: "STYLE",
      element: [
        "Abstract",
        "Fine Art",
        "Modern",
        "Abstract Expressionism",
        "Figurative",
        "Impressionism",
        "Realism",
        "Conceptual",
        "Minimalism",
        "Pop Art",
        "Pop Art",
        "Portraiture",
        "Surrealism",
        "Art Deco",
        "Illustration",
        "Street Art",
        "Photorealism",
        "Cubism",
        "Folk",
        "Documentary",
        "Dada",
      ],
    },
  ];
  const subjectElement = [
    {
      title: "SUBJECT",
      element: [
        "Abstract",
        "Landscape",
        "Portrait",
        "People",
        "Animal",
        "floral",
        "Nature",
        "women",
        "Still Life",
        "Seascape",
        "Fantasy",
        "Cities",
        "Architecture",
        "Body",
        "Botanic",
        "Beach",
        "Geometric",
        "Love",
        "Culture",
        "Men",
        "Pop Culture/Celebrity",
        "Erotic",
        "World Culture",
        "Children",
        "Music",
        "Religious",
        "Popular culture",
        "Classical mythology",
        "Garden",
        "Interiors",
        "Places",
        "Tree",
        "Celebrity",
        "Water",
        "Boat",
        "Horse",
        "Food",
        "Fashion",
        "Political",
        "Performing Arts",
        "Religion",
        "Fish",
        "Graffiti",
        "Outer Space",
        "Mortality",
        "Calligraphy",
        "Cats",
        "Family",
        "Aerial",
        "Dogs",
        "Food & Drink",
        "Light",
        "Cartoon",
        "Home",
        "Travel",
        "Humor",
        "Sailboat",
        "Cinema",
        "Rural life",
        "Seasons",
        "Sport",
        "Patterns",
        "Car",
        "Sports",
        "Time",
        "Automobile",
        "Kids",
        "Comics",
        "Science/Technology",
        "Politics",
        "Language",
        "Health & Beauty",
        "Science",
        "Ship",
        "Typography",
        "Transportation",
        "Bicycle",
        "Business",
        "Airplane",
        "Technology",
        "Wall",
        "Cows",
        "Cuisine",
        "Train",
        "Education",
        "Aeroplane",
        "Yacht",
        "Kitchen",
        "Motorcycle",
        "Bike",
        "Motorbike",
        "Motor",
      ],
    },
  ];
  const mediumElement = [
    {
      title: "MEDIUM",
      element: [
        "Acrylic",
        "Oil",
        "Watercolor",
        "Ink",
        "Spray Paint",
        "Gesso",
        "Paper",
        "Paint",
        "Gouache",
        "Pastel",
        "Pencil",
        "Digital",
        "Charcoal",
        "Graphite",
        "Color",
        "Enamel",
        "Marker",
        "Tempera",
        "Household",
        "Airbrush",
        "Fabric",
        "Resin",
        "Wax",
        "Wood",
        "Chalk",
        "Textile",
        "Plaster",
        "Black & White",
        "Metal",
        "Photo",
        "Ballpoint Pen",
        "Found Objects",
        "Conte",
        "Latex",
        "Stencil",
        "Manipulated",
        "Plastic",
        "Fiber",
        "Vector",
        "Screenprinting",
        "Encaustic",
        "Monotype",
        "Glass",
        "Stone",
        "C-type",
        "Clay",
        "Crayon",
        "3D Sculpting",
        "Lithograph",
        "Environmental",
        "Ceramic",
        "Neon",
        "Dye Transfer",
        "Full spectrum",
        "Paper mache",
        "Gelatin",
        "Marble",
        "Photogram",
        "Engraving",
        "Mosaic",
        "Woodcut",
        "Silverpoint",
        "Aquatint",
        "Linocuts",
        "Kinetic",
        "Bronze",
        "Steel",
        "Algorithmic Art",
        "Leather",
        "Giclée",
        "Lights",
        "Interactive",
        "Fiberglass",
        "Rubber",
        "Etching",
        "Fractal",
        "LED",
        "Timber",
        "Platinum",
        "Sound",
        "Polaroid",
        "Drypoint",
        "Granite",
        "Pottery",
        "Robotics",
        "Pen and Ink",
        "Decoupage",
        "Lenticular",
        "Taxidermy",
        "Mezzotint",
        "Pinhole",
      ],
    },
  ];

  const materialElement = [
    {
      title: "MATERIAL",
      element: [
        "Canvas",
        "Paper",
        "Wood",
        "Other",
        "Cardboard",
        "Soft (Yarn, Cotton, Fabric)",
        "Plastic",
        "Aluminium",
        "Glass",
        "acrylic",
        "Carbon Fibre",
        "Linen",
        "Oil",
        "Canvas board",
        "Bronze",
        "Steel",
        "Stone",
        "Panel",
        "Marble",
        "Ceramic",
        "Iron",
        "Oil Paint",
        "Paint",
        "Ink",
        "Stainless Steel",
        "Wood Panel",
        "Acrylic Paint",
        "Canvas Panel",
        "Masonite",
        "Watercolor",
        "Varnish",
        "Stretched Canvas",
        "Gesso",
        "Gold Leaf",
        "Sound",
        "Watercolor Paper",
        "Mdf",
        "Resin",
        "Acrylic On Gallery-wrapped Canvas",
        "Oil On Canvas",
        "Sand",
        "Linen Canvas",
        "Hardboard",
        "High Quality Professional Oil Art Paints, Canvas, Covered With Protective Varnish",
        "Mixed Media",
        "Acrylic On Canvas",
        "Acrylics",
        "High Quality Professional Oil Art Paints, Italian Linen Canvas, Covered With Protective Varnish",
        "Charcoal",
        "Pencil",
        "Silk",
        "Encaustic",
        "Plexiglass",
        "Watercolour",
        "Pastel",
        "Plywood",
        "Collage",
        "Digital",
        "Plaster",
        "Acid Free Canson Paper",
        "Gold",
        "Mdf Board",
        "Acrylic Paints",
        "Mdf Wood Panel",
        "Spray paint",
        "Newspaper",
        "Frame",
        "Marker",
        "Oil Pastel",
        "Raw Canvas",
        "Wood Frame",
        "Oil Paints",
        "Palette Knife",
        "Canvas Paper",
        "Acrylic sealant",
        "Carton",
        "Unstretched Canvas",
        "Wax",
        "Graphite",
        "Alcohol Ink",
        "Rice Paper",
        "Japanese Paper",
        "Pigments",
        "Arches 100 Percent Cotton Watercolor Paper",
        "Fine Art Paper",
        "Papyrus",
        "Brush",
        "Texture",
        "Acid Free Foam Core Backing",
        "Cotton Canvas",
        "Glitter",
        "Acrylic. Mixed Material",
        "Rolled Canvas",
        "Silver Leaf",
        "Photography",
        "Yupo",
        "Canvasboard",
        "Metal",
        "Oil Painting",
        "Textile",
      ],
    },
  ];

  const priceElement = [
    {
      title: "PRICE",
      element: [
        "Under ₹500",
        "₹500 - ₹1,000",
        "₹1,000 - ₹2,000",
        "₹2,000 - ₹5,000",
        "₹5,000 - ₹10,000",
        "Over ₹10,000",
      ],
    },
  ];

  const sizeElement = [
    {
      title: "SIZE",
      element: ["Small", "Medium", "Large", "Oversized"],
    },
  ];

  const orientationElement = [
    {
      title: "ORIENTATION",
      element: ["Horizontal", "Vertical", "Square"],
    },
  ];

  const colorElement = [
    {
      title: "COLOR",
      element: [],
    },
  ];

  const artistCountryElement = [
    {
      title: "ARTIST COUNTRY",
      element: [
        "United States",
        "United Kingdom",
        "Germany",
        "France",
        "Spain",
        "Italy",
        "Canada",
        "Netherlands",
        "Ukraine",
        "India",
        "Poland",
        "Australia",
        "Hungary",
        "Turkey",
        "Serbia",
        "Romania",
        "Bulgaria",
        "South Korea",
        "Israel",
        "Belgium",
        "Czech Republic",
        "Greece",
        "Switzerland",
        "Japan",
        "Austria",
        "Portugal",
        "Pakistan",
        "Brazil",
        "Latvia",
        "Mexico",
        "Argentina",
        "Slovakia",
        "Armenia",
        "China",
        "Georgia",
        "Vietnam",
        "Indonesia",
        "Lithuania",
        "Sweden",
        "South Africa",
        "Moldova",
        "Ireland",
        "Slovenia",
        "Norway",
        "Kazakhstan",
        "Nigeria",
        "Estonia",
        "Thailand",
        "Croatia",
        "Finland",
        "Colombia",
        "United Arab Emirates",
        "Egypt",
        "Sri Lanka",
        "Denmark",
        "Cyprus",
        "New Zealand",
        "Macedonia",
        "Uruguay",
        "Chile",
        "Singapore",
        "Hong Kong",
        "Azerbaijan",
        "Kenya",
        "Bangladesh",
        "Uzbekistan",
        "Mozambique",
        "Luxembourg",
        "Malaysia",
        "Ghana",
        "Taiwan",
        "Lebanon",
        "Philippines",
        "Montenegro",
        "Costa Rica",
        "Bosnia and Herzegovina",
        "Ecuador",
        "Saint Martin",
        "Peru",
        "Venezuela",
        "Iceland",
        "United States Minor Outlying Islands",
        "Kyrgyzstan",
        "Albania",
        "Jamaica",
        "Uganda",
        "Malta",
        "Morocco",
        "Trinidad and Tobago",
        "Qatar",
        "Puerto Rico",
        "Saudi Arabia",
        "Paraguay",
        "Sint Maarten",
        "Tunisia",
        "Russia",
        "Jordan",
        "Kosovo",
        "Monaco",
        "Nicaragua",
      ],
    },
  ];

  const featuredArtistElement = [
    {
      title: "FEATURED ARTIST",
      element: [
        "Artkya Catalog",
        "Inside The Studio",
        "Rising Stars",
        "One To Watch",
        "The Other Art Fair",
      ],
    },
  ];

  return (
    <>
      <div className="static">
        <Header />
        <h2 className="px-10">Painting</h2>
        <div className="mt-10 lg:flex">
          <div className="w-1/4 rounded-lg rounded-br-xl px-10">
            <h2>Category</h2>
            <div className="w-full bg-gray-50 border border-gray-200 backdrop-blur-lg rounded-md mt-6 px-3 py-2 text-xl text-center">
              Paintings
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion element={styleElement} />
              {!toggleHide ? <div>{newstyleElement}</div> : <div>{styleElement}</div>}
              <button onClick={() => handleClick()}>{buttonText}</button>
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion element={subjectElement} />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion element={mediumElement} />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion element={materialElement} />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion element={priceElement} />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion element={sizeElement} />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion element={orientationElement} />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion element={colorElement} />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion element={artistCountryElement} />
            </div>
            <div className="px-4 bg-white border-t border-b border-slate-200 rounded-lg mt-2.5">
              <Accordion element={featuredArtistElement} />
            </div>
          </div>
          <div className="w-4/6 mt-10 lg:flex">
            <div className="">
              {/* <div className="bg-gray-100 h-auto backdrop-blur-lg rounded-md w-full md:max-lg:max-w-screen-sm md:max-lg:mx-auto mt-6 px-3 py-2">Left</div> */}
              <div className="mt-20">
                <div className="h-auto mt-32 gap-10 lg:gap-16 columns-1 md:columns-2 lg:columns-3 2xl:columns-3 gap-y-16 [&>img:not(:first-child)]:mt-5 lg:[&>img:not(:first-child)]:mt-16">
                  <div>
                    <img src={Img1} alt="" />
                    <br />
                    <div>
                      <ArtDetails />
                    </div>
                  </div>
                  <div>
                    <img src={Img3} alt="" />
                    <br />
                    <div>
                      <ArtDetails />
                    </div>
                  </div>
                  <div>
                    <img src={Img14} alt="" />
                    <br />
                    <div>
                      <ArtDetails />
                    </div>
                  </div>
                  <div>
                    <img src={Img6} alt="" />
                    <br />
                    <div>
                      <ArtDetails />
                    </div>
                  </div>
                  <div>
                    <img src={Img8} alt="" />
                    <br />
                    <div>
                      <ArtDetails />
                    </div>
                  </div>
                  <div>
                    <img src={Img9} alt="" />
                    <br />
                    <div>
                      <ArtDetails />
                    </div>
                  </div>
                  <div>
                    <img src={Img12} alt="" />
                    <br />
                    <div>
                      <ArtDetails />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Painting;

export const ExhibitionItem = ({ exhibitionName, year }) => {
  return (
    <div className="flex items-center space-x-4 border-b">
      <FontAwesomeIcon icon={faPaintBrush} className="text-yellow-500" />
      <div className="text-base w-96">{exhibitionName}</div>
      <div className="w-40 font-semibold text-stone-700">{year}</div>
    </div>
  );
};

export const SkeletonLoader = () => {
  return (
    <div
      role="status"
      className="max-w-sm border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
        <svg
          className="w-12 h-12 text-gray-200 dark:text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
        </svg>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      <div className="flex items-center mt-4 space-x-3">
        <svg
          className="text-gray-200 w-14 h-14 dark:text-gray-700"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
          <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const ArtDetails = () => {
  return (
    <div className="w-full text-black">
      <div className="text-sm font-normal lg:text-base xl:text-lg lg:items-start lg:justify-normal lg:flex-col">
        <div className="text-gray-500 lg:text-base xl:text-base">
          ID: AK125436
        </div>
        <div className="-mt-1 text-sm font-semibold text-gray-500 lg:text-base xl:text-base md:text-sm">
          <div className="lg:text-xs xl:text-xs">W 120 * H 300 inches</div>
        </div>
      </div>
      <div className="flex justify-between text-sm font-semibold text-gray-500 xl:text-base md:text-sm my-5">
        <div>
          <div className="text-sm">Elizabeth Becker</div>
          <div className="text-xs -pt-2">United States</div>
        </div>
        <div>
          <span className="text-sm">Price:</span> Print Copy $75
        </div>
      </div>
    </div>
  );
};
