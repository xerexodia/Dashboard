import React, { useState, useEffect } from "react";
import { base64, url } from "constants/urls";
import { useParams } from "react-router-dom";
import axios from "axios";
import 'styles/Product.scss';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const getProduct = async () => {
    setLoading(true);
    const data = await axios.get(`${url}GalleryMachine/${id}`);
    console.log(data);
    setProduct(data.data);
    setLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const Loading = () => {
    return <>Loading....</>;
  };

  const ShowProduct = () => {
    return (
      <div className="card">
        <div className="row">
          <div className="col-md-6">
            <div className="img-container">
              <img
                src={base64 + product.attachment}
                alt={product.title}
                className="img-fluid rounded"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <h4 className="text1-uppercase1 text-black-50 mb-3">
                {product.category}
              </h4>
              <h1 className="display-5 mb-4">{product.title}</h1>
              <p className="lead">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="containerProduct my-5">
        {loading ? <Loading /> : <ShowProduct />}
      </div>
    </div>
  );
};

export default ProductDetails;
