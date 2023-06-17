import React, { useEffect, useState } from "react";
import { url, base64 } from "constants/urls";
import { NavLink } from "react-router-dom";
import 'styles/Products.scss';

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let componentMounted = true;
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(`${url}GalleryMachine/MachinesGallery`);
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="row justify-content-center">
          {filter.map((product) => {
            return (
              <div className="col-md-4 mb-5" key={product.id}>
                <div className="card h-100 text-center p-4">
                  <img
                    src={base64 + product.attachment}
                    className="card-img-top"
                    alt={product.title}
                    height="200"
                    width="100"
                  />
                  
                  <div className="card-body text-center">
                    <h5 className="card-title mb-0">
                      {product.title.substring(0, 25)} ...
                    </h5>
                    <p className="card-text lead fw-bold mt-5 mb-5"></p>
                    <NavLink
                      to={`/product/${product.id}`}
                      className="btn2 btn-outline-dark me-2"
                    >
                      Découvrir
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="containerProducts my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Les produits</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center mb-5">
          <div className="col-12">
            <div className="buttons d-flex justify-content-center">
              <button
                className="btn1 btn-outline-dark me-2"
                onClick={() => setFilter(data)}
              >
                Tout
              </button>
              <button
                className="btn1 btn-outline-dark me-2"
                onClick={() => filterProduct("GIF")}
              >
                GIF
              </button>
              <button
                className="btn1 btn-outline-dark me-2"
                onClick={() => filterProduct("CF")}
              >
                CF
              </button>
              <button
                className="btn1 btn-outline-dark me-2"
                onClick={() => filterProduct("TJF")}
              >
                TJF
              </button>
              <button
                className="btn1 btn-outline-dark me-2"
                onClick={() => filterProduct("BF")}
              >
                BF
              </button>
              <button
                className="btn1 btn-outline-dark me-2"
                onClick={() => filterProduct("CV")}
              >
                CV
              </button>
              <button
                className="btn1 btn-outline-dark me-2"
                onClick={() => filterProduct("CLV")}
              >
                CLV
              </button>
              <button
                className="btn1 btn-outline-dark me-2"
                onClick={() => filterProduct("AC")}
              >
                AC
              </button>
              <button
                className="btn1 btn-outline-dark me-2"
                onClick={() => filterProduct("LMD")}
              >
                LMD
              </button>
              <button
                className="btn1 btn-outline-dark me-2"
                onClick={() => filterProduct("MAJ")}
              >
                MAJ
              </button>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12">
            {loading ? null : <ShowProducts />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
