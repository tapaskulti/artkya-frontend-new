import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const HowToTutorial = ({ handalCompBtnClick }) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="p-4">
      <div>
        <h1>Photographing Your Artwork</h1>
        <button  onClick={()=>handalCompBtnClick("uploadwork")} className="px-4 py-2 bg-blue-500 text-white rounded">Upload Artwork</button>
      </div>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          How To Photograph Your Artwork
        </AccordionHeader>
        <AccordionBody>
          <h3 className="text-lg font-bold mb-2">Upload Standards</h3>
          <p className="mb-2">Your image must be:</p>
          <ul className="list-disc list-inside mb-2">
            <li className="mb-1">A JPG file in RGB color format (not CMYK)</li>
            <li className="mb-1">At least 1200 pixels x 1500 pixels</li>
            <li>Less than 50MB</li>
          </ul>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Displaying Multiple Images
        </AccordionHeader>
        <AccordionBody>
          The number one request from interested collectors prior to purchasing
          an artwork online is to see additional images. Once you've completed
          uploading your artwork, you can add up to five (5) additional images.
          We highly encourage you to add additional images of your artwork
          hanging on a wall, detail shots, close ups, the edges, and the back of
          the artwork.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Lighting
        </AccordionHeader>
        <AccordionBody>
          <h3>Color Balance and Exposure</h3>
          <div
            data-type="photography-text"
            data-section="color-exposure"
            className="krw7aj-0 d5x441-8 kpRguR fdzFXw"
          >
            The color of the room, temperatures and use of flash can all distort
            the color balance, resulting in blues, yellows and greys that really
            should more closely resemble white.
          </div>
          <h3>Harsh Shadows and Reflections</h3>
          <div
            data-type="photography-text"
            data-section="shadows-reflections"
            className="krw7aj-0 d5x441-8 kpRguR fdzFXw"
          >
            Ensure your light-source provides even color and no directional
            shadows or reflections, which can distract from your artwork.
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 4}>
        <AccordionHeader onClick={() => handleOpen(4)}>Quality</AccordionHeader>
        <AccordionBody>
          <div className="d5x441-1 cIEhIB">
            <h3>Noise and/or Compression</h3>
            <div
              data-type="photography-text"
              data-section="noise-compression"
              className="krw7aj-0 d5x441-8 kpRguR fdzFXw"
            >
              Avoid excessive noise by using a low ISO, (ideally between
              100-200), or by shooting in sufficient light. (A cloudy day can be
              ideal, as the clouds work like a giant softbox). Check to ensure
              your camera is shooting at its highest quality settings and the
              file is saved at maximum quality.
            </div>
            <h3>Out of Focus / Motion Blur</h3>
            <div
              data-type="photography-text"
              data-section="motion-blur"
              className="krw7aj-0 d5x441-8 kpRguR fdzFXw"
            >
              Review images at 100% when choosing the best shot, to ensure you
              also choose the best focus. (By shooting with sufficient light,
              you decrease the likelihood of camera shake when shooting
              hand-held).
            </div>
            <h3>Post-Production Over Filtering</h3>
            <div
              data-type="photography-text"
              data-section="post-production-filtering"
              className="krw7aj-0 d5x441-8 kpRguR fdzFXw"
            >
              Some files may benefit with post-production by adjusting color,
              brightness or contrast to more closely resemble the actual
              artwork. However, files that have been heavily post-processed,
              affecting confusion of medium or quality (color range) of artwork
              are subject to deactivation.
            </div>
            <h3>Upsampling</h3>
            <div
              data-type="photography-text"
              data-section="upsampling"
              className="krw7aj-0 d5x441-8 kpRguR fdzFXw"
            >
              Increasing the file size only decreases quality. Instead of the
              misconception it will allow a file to be printed at a larger size,
              it actually decreases the quality in which the file will print.
            </div>
            <h3>Intrusive Digital Signatures or Text</h3>
            <div
              data-type="photography-text"
              data-section="digital-signature"
              className="krw7aj-0 d5x441-8 kpRguR fdzFXw"
            >
              Artwork celebrates the signature of the artists, representing
              ownership and creation; however, digital watermarks or in camera
              date and times make your work appear less valuable.
            </div>
          </div>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 5}>
        <AccordionHeader onClick={() => handleOpen(5)}>
          Composition
        </AccordionHeader>
        <AccordionBody>
          <div className="d5x441-1 sc-1pyi7uk-18 gvZcYe bzrtzP">
            <div
              className="sc-1wf1hh5-0 aGWOA Collapsable"
              style={{ height: "318px", width: "1440px" }}
              open=""
            >
              <div>
                <div className="d5x441-1 cIEhIB">
                  <h3>Parallel Angles/Rotation</h3>
                  <div
                    data-type="photography-text"
                    data-section="parallel-angles"
                    className="krw7aj-0 d5x441-8 kpRguR fdzFXw"
                  >
                    If you must tilt artwork to take a photograph, ensure the
                    camera is also at a parallel angle. A square or rectangle
                    should have even edges.
                  </div>
                  <h3>Borders and Padding</h3>
                  <div
                    data-type="photography-text"
                    data-section="border-padding"
                    className="krw7aj-0 d5x441-8 kpRguR fdzFXw"
                  >
                    Crop excessive blank space, artwork borders, mattes and
                    padding. Adding extra space will not bypass you from minimum
                    size requirements.
                  </div>
                  <h3>Composition: Rotation 90º-180º</h3>
                  <div
                    data-type="photography-text"
                    data-section="composition"
                    className="krw7aj-0 d5x441-8 kpRguR fdzFXw"
                  >
                    Artwork should be properly rotated upon submission.
                  </div>
                  <h3>Art Only</h3>
                  <div
                    data-type="photography-text"
                    data-section="art-only"
                    className="krw7aj-0 d5x441-8 kpRguR fdzFXw"
                  >
                    Increasing the file size only decreases quality. Instead of
                    the misconception it will allow a file to be printed at a
                    larger size, it actually decreases the quality in which the
                    file will print.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
}

export default HowToTutorial;
