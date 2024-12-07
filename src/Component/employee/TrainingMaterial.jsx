import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Static imports for images
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img5 from "../../assets/5.jpg";
import img6 from "../../assets/6.jpg";
import img7 from "../../assets/7.jpg";
import img8 from "../../assets/8.jpg";
import img9 from "../../assets/9.jpg";
import img10 from "../../assets/10.jpg";

// Define the data for companies and their respective modules with images
const data = {
  "India Mart": {
    "Module ": [img1, img2, img3],
  },
  "Live Keeping": {
    Pricing: [img7, img8],
    "Tally on Web": [img9, img10],
  },
};

const TrainingMaterial = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  // Function to reset the module selection if a new company is selected
  const handleCompanySelection = (company) => {
    setSelectedCompany(company);
    setSelectedModule(null); // Reset the module when a new company is selected
  };

  // Function to handle module selection
  const handleModuleSelection = (module) => {
    setSelectedModule(module);
  };

  return (
    <div className="main">
      <div className="ems-content p-5">
        <div className="container hm-trainingmaterial">
          <h1 className="razr-hm-emp-trng-mt-title">TRAINING MATERIAL</h1>

          {/* Step 1: Show company selection */}
          {!selectedCompany && (
            <div className="razr-hm-emp-trng-mt-company-selection">
              <h2 className="razr-hm-emp-trng-mt-subtitle">Select a Company</h2>
              <div className="razr-hm-emp-trng-mt-company-cards">
                {Object.keys(data).map((company) => (
                  <div
                    key={company}
                    className="razr-hm-emp-trng-mt-card"
                    onClick={() => handleCompanySelection(company)}
                  >
                    <h2 className="razr-hm-emp-trng-mt-card-title">
                      {company}
                    </h2>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Show module selection when a company is selected */}
          {selectedCompany && !selectedModule && (
            <div className="razr-hm-emp-trng-mt-module-selection">
              <h2 className="razr-hm-emp-trng-mt-subtitle">
                Select a Module for {selectedCompany}
              </h2>
              <div className="razr-hm-emp-trng-mt-module-cards">
                {Object.keys(data[selectedCompany]).map((module) => (
                  <div
                    key={module}
                    className="razr-hm-emp-trng-mt-card"
                    onClick={() => handleModuleSelection(module)}
                  >
                    <h2 className="razr-hm-emp-trng-mt-card-title">{module}</h2>
                  </div>
                ))}
              </div>
              <button
                className="razr-hm-emp-trng-mt-back-btn"
                onClick={() => setSelectedCompany(null)}
              >
                Back to Companies
              </button>
            </div>
          )}

          {/* Step 3: Show carousel when a module is selected */}
          {selectedCompany && selectedModule && (
            <div className="razr-hm-emp-trng-mt-carousel-section">
              <h2 className="razr-hm-emp-trng-mt-subtitle">
                {selectedModule} - {selectedCompany}
              </h2>
              <Carousel
                showArrows={true}
                infiniteLoop={true}
                autoPlay={true}
                interval={2000}
                showThumbs={false}
                showStatus={false}
                swipeable={true}
                dynamicHeight={true}
                useKeyboardArrows={true}
              >
                {data[selectedCompany][selectedModule].map((img, index) => (
                  <div key={index}>
                    <img
                      src={img}
                      alt={`Image ${index + 1}`}
                      className="razr-hm-emp-trng-mt-carousel-img"
                    />
                  </div>
                ))}
              </Carousel>
              <button
                className="razr-hm-emp-trng-mt-back-btn"
                onClick={() => setSelectedModule(null)}
              >
                Back to Modules
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingMaterial;
