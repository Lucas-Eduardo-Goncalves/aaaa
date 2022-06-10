import React, { useEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import Heading from '~/components/heading/heading';
import { Button } from '~/components/buttons/buttons';
import usePrice from '~/utility/usePrice';
import { IMAGES_URL } from '~/utility/useLinks';
import { ProductCard } from '../Style';

const ProductCards = ({ product, action }) => {
  const name = product.Cadastro_DESCRPROD.$;
  const oldPrice = product.Preço_1.$;
  const newPrice = product.Preço_PROMO_1.$;
  const { price, basePrice, discount } = usePrice({
    amount: newPrice !== '0.00' ? parseFloat(newPrice) : parseFloat(oldPrice),
    baseAmount: parseFloat(oldPrice),
    currencyCode: 'BRL',
  });
  const id = product.Cadastro_CODPROD.$;
  const isPromo = product.ISPROMOCAO === 'true';
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (product) {
      const url = `${IMAGES_URL}/${product.Cadastro_CODPROD.$}.jpg`;
      const defaultUrl = `${IMAGES_URL}/pp.jpg`;
      const img = new Image();
      img.src = url;
      if (img.complete) {
        setImage(url);
      } else {
        img.onload = () => {
          setImage(url);
        };

        img.onerror = () => {
          setImage(defaultUrl);
        };
      }
    }
  }, [product]);

  function handleClick() {
    const data = {
      id: id,
      name: name,
    };
    return action(data);
  }

  return (
    <>
      {isPromo ? (
        <Badge.Ribbon text="Promoção" color="red">
          <ProductCard style={{ marginBottom: 30, overflow: 'hidden' }}>
            <figure>
              <img src={image} alt={`img${id}`} />
            </figure>
            <figcaption>
              <Heading className="product-single-title" as="h5">
                {name}
              </Heading>
              <p className="product-single-price">
                <span className="product-single-price__new">{price} </span>
                {basePrice && (
                  <>
                    <del className="product-single-price__old"> {basePrice} </del>
                    <span className="product-single-price__offer"> {discount} Off</span>
                  </>
                )}
              </p>

              <div className="product-single-action">
                <Button onClick={handleClick} block size="small" className="btn-cart" type="primary">
                  <FeatherIcon icon="info" size={14} />
                  Ver detalhes
                </Button>
              </div>
            </figcaption>
          </ProductCard>
        </Badge.Ribbon>
      ) : (
        <ProductCard style={{ marginBottom: 30, overflow: 'hidden' }}>
          <figure>
            <img src={image} alt={`img${id}`} />
          </figure>
          <figcaption>
            <Heading className="product-single-title" as="h5">
              {name}
            </Heading>
            <p className="product-single-price">
              <span className="product-single-price__new">{price} </span>
              {basePrice && (
                <>
                  <del className="product-single-price__old"> {basePrice} </del>
                  <span className="product-single-price__offer"> {discount} Off</span>
                </>
              )}
            </p>

            <div className="product-single-action">
              <Button onClick={handleClick} block size="small" className="btn-cart" type="primary">
                <FeatherIcon icon="info" size={14} />
                Ver detalhes
              </Button>
            </div>
          </figcaption>
        </ProductCard>
      )}
    </>
  );
};

ProductCards.propTypes = {
  product: PropTypes.object,
};

export default ProductCards;
