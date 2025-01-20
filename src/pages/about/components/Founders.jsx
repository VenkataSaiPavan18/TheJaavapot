import React from "react";
import "../about.css";
import img from "../../../assets/img/about/Image05.png";
import img02 from "../../../assets/img/about/Image03.png";

function Founders() {
  return (
    <div className="founders-container">
      <div className="FounderHeading">
        <div className="HeadingContent">
          <p className="meet-our-text">Meet Our</p>
          <p className="founders-text">Founders</p>
        </div>
      </div>

      <div className="row rest-about">
        <div className="col-md-6 text-center">
          <img src={img} alt="Founder" className="founder-image" />
        </div>
        <div className="col-md-6 rest-about">
          <p className="storyText">
            <span className="quote-symbol">“</span> Here is the story of Our Founders, who were dealing with their
            elderly ill parents who have digestive issues that come through side
            effects associated with the long-term medication that they were
            taking. In their search for a solution, they discovered ancient
            grains and foods as food that worked so magically on them leading to
            positive results within no time.
          </p>

          <p className="storyText">
            <span className="quote-symbol">”</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Founders;
