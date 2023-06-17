import React from "react";
import 'styles/About.scss';


function About() {
  return (
    <>
      <div className="about-page">
        <div className="row">
          <div className="col-md-6">
            <div className="cadre">
              <h1 style={{ marginBottom: "30px" }}>Nous connaître</h1>
              <p style={{ textAlign: "justify", marginBottom: "40px" }}>
                Technologies Médicales et Scientifiques ‘’TMS ‘’est une SARL
                fondée en 2002. TMS est leader en Tunisie dans le domaine de
                l’endoscopie médicale, elle est le représentant exclusif en
                Tunisie de la multinationale Olympus qui est une référence
                mondiale dans la fabrication et la conception des endoscopes.
              </p>
              <p style={{ textAlign: "justify", marginBottom: "40px" }}>
                Les principales activités sont la commercialisation,
                l’installation, l’assistance à l’utilisation et la maintenance
                des microscopes, des endoscopes médicaux et des appareils
                électroniques reliés, ainsi que la commercialisation des
                accessoires endoscopiques.
              </p>
              <p style={{ textAlign: "justify", marginBottom: "40px" }}>
                Grâce à la compétence et au savoir-faire de ses collaborateurs
                des différents services et parce qu’elle est soucieuse en
                permanence de satisfaire ses clients, elle a très vite gagné la
                confiance de ces derniers (hôpitaux, cliniques et cabinets
                privés) et elle s’est distinguée de ses concurrents. La société
                TMS étant convaincue que le capital humain et la bonne gestion
                sont la clé de la réussite, elle s’investit régulièrement dans
                la formation de son personnel.
              </p>
            </div>
          </div>
          <div className="img-container">
            <div style={{ width: "100%" }}>
              <img
                src="/à propos.png"
                alt="no-repeat right center / cover "
                style={{
                  margin: " auto",
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "6px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;