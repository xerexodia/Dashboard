import React from "react";
import "styles/Home.scss";

const Home = () => {
  return (
    <>
      <div className="Home">
        <div className="cardHome">

          <img
            src="background.jpg"
            className="card-img"
            alt="background"
            height="855px"
          />
          <div className="card-img-overlay d-flex flex-column justify-content-center">
            <div className="containerHome">
              <h5 className="card-titleHome display-3 fw-bolder mb-0">
                Bienvenue à tous
              </h5>
              <p className="card-textHome lead fs-2">
                Découvrez toutes les tendances
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container1 mt-5">
        <div className="row">
          <div className="col-md-6 mb-4 mr-md-2"> {/* Added mr-md-2 class */}
            <div className="cardPolitique">
              <img
                src="Politique-qualite.png"
                className="card1-img-top"
                alt="Card 1"
                style={{ height: "600px", objectFit: "cover", width: "420px", objectFit: "cover" }}
              />
              <div className="cardPolitique-body">
                <h5 className="card-title">Politique qualité</h5>
                <p className="card-text">dffdgdgf fd fdfgdfdg fdgf dgfdg fdg fdg fdfd fdg fg dfg dffdgfgd</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="cardISO">
              <img
                src="Politique-qualite.png"
                className="card2-img-top"
                alt="Card 1"
                style={{ height: "600px", objectFit: "cover", width: "420px", objectFit: "cover" }}
              />
              <div className="cardISO-body">
                <h5 className="card-title">Politique qualité</h5>
                <p className="card-text">sdfsfd sfdsdf sdf sdf </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
