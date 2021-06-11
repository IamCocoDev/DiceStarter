import React, {useEffect, useState} from 'react';
import './productDetail.css';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {productDetail} from '../../../app/reducers/handleProductsReducer';
import ColorCircle from '../../DummyComponents/colorCircle/ColorCircle';
import {changeProductInDBAsync, getProductByIdAsync}
  from '../../../app/actions/handleProductsActions/index';
import UserReviews from '../userReviews/userReviews';
import Carousel from '../../DummyComponents/carousel/carousel';
import {userInfo, userToken} from '../../../app/reducers/registerReducer';
import {addProductInCart} from '../../../app/actions/cartActions/index';
import RatingStars from '../../DummyComponents/ratingStars/ratingStars';
import swal from 'sweetalert2';
import {
  addProductInWishlist,
  deleteProductInWishlist,
} from '../../../app/actions/wishlistActions';
import LoadingScreen from '../../DummyComponents/loadingScreen/loadingScreen';
import Select from 'react-select';
import {getCategoriesAsync}
  from '../../../app/actions/handleProductsActions/index';
import {productCategories} from '../../../app/reducers/handleProductsReducer';
import {wishlistsReducer} from '../../../app/reducers/wishlistReducer';

function ProductDetail(props: any) {
  const wishlist = useAppSelector(wishlistsReducer);
  const token = useAppSelector(userToken);
  const User = useAppSelector(userInfo);
  const [editMode, setEditMode] = useState(false);
  const [active, setActive] = useState(false);
  const dispatch = useAppDispatch();
  const product = useAppSelector(productDetail);
  const productCats = useAppSelector(productCategories);
  const [color, setColor] = useState('');
  const categories = productCats.map((c) => {
    return {
      value: c.id,
      label: c.value,
    };
  });
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(getProductByIdAsync(id))
        .then((p) => {
          setChanges(p);
        }).catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (product) {
      if (wishlist.find((el) => el.id === product.id)) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  }, [product]);

  const handleOnCart = () => {
    const duplicate = JSON.parse(localStorage
        .getItem('cart') || '[]').find((el) => el.id === product.id);
    if (duplicate) {
      swal.fire({
        text: 'You already added this product to cart!',
        icon: 'info',
        background: '#202020',
      });
    } else {
      dispatch(addProductInCart({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.picture,
        stock: product.stock,
        amount: 1,
      }, User.id, User.address));
      swal.fire({
        text: 'Product added succesfully!',
        icon: 'success',
        background: '#202020',
        position: 'top-end',
      });
    }
  };
  const handleOnWishlist = () => {
    const duplicate = JSON.parse(localStorage
        .getItem('wishlist') || '[]').find((el) => el.id === product.id);
    if (duplicate) {
      dispatch(deleteProductInWishlist(product.id, User.id, token));
      swal.fire({
        text: 'Product removed from the wishlist!',
        icon: 'info',
        background: '#202020',
      });
    } else {
      dispatch(addProductInWishlist({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.picture[0],
        stock: product.stock,
        amount: 1,
      }, User.id, token));
      swal.fire({
        text: 'Product added succesfully!',
        icon: 'success',
        background: '#202020',
      });
    }
  };
  // saves changes to product
  const style = {
    container: (provided, state) => ({
      ...provided,
      outline: 'none',
      backgroundColor: '#101010',
      color: 'white',
    }),
    control: (provided, state) => ({
      ...provided,
      border: state.isSelected ? 'none' : 'white',
      boxShadow: 'none',
      backgroundColor: '#101010',
      color: 'white',
    }),
    ValueContainer: () => ({
      backgroundColor: '#101010',
      color: 'white',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#74009D': '#101010',
      cursor: state.isFocused ? 'pointer': 'default',
      color: 'white',
    }),
    IndicatorsContainer: (provided, state) => ({
      ...provided,
      backgroundColor: '#101010',
      cursor: state.isFocused ? 'pointer': 'default',
      color: 'white',
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#101010',
      color: 'white',
    }),
  };

  const [productDetailCategories,
    setProductDetailCategories] = useState(product?.categories.map((c) => {
    return {
      value: c.id,
      label: c.name,
    };
  }));

  useEffect(() => {
    setProductDetailCategories(product?.categories?.map((c) => {
      return {
        value: c.id,
        label: c.name,
      };
    }));
  }, [product]);

  const handleSelectChange = (e:any) => {
    setProductDetailCategories(e);
  };

  const handleProductChange = () => {
    dispatch(changeProductInDBAsync(changes, token))
        .then((r) => {
          if (r !== 'error') {
            swal.fire({
              text: 'Changes Saved!',
              icon: 'success',
              background: '#202020',
            });
          } else {
            swal.fire({
              text: 'Oops, something went wrong',
              icon: 'error',
              background: '#202020',
            });
          }
        }).catch((err) => console.error(err));
    setEditMode(!editMode);
  };
  const [changes, setChanges] = useState({
    id: product?.id,
    name: product?.name,
    picture: product?.picture,
    price: product?.price,
    size: product?.size,
    color: product?.color,
    available: product?.available,
    stock: product?.stock,
    description: product?.description,
    categories: product?.categories,
    rating: product?.rating,
  });

  useEffect(() => {
    setChanges({...changes,
      categories: productDetailCategories?.map((c) => c.value)});
  }, [productDetailCategories]);

  const addColor = (color: string) => {
    changes.color.forEach((c) => {
      if (c === color) {
        swal.fire({
          text: 'You already added this color!',
          icon: 'info',
          background: '#202020',
        });
      }
    });
    if (changes.color.length < 5) {
      const repColor = changes.color.find((el: string) => el === color);
      if (!repColor) {
        const newcolor = [...changes.color, color];
        setChanges({...changes, color: newcolor});
      }
    } else {
      swal.fire({
        text: 'Products cannot have more than 5 colors!',
        icon: 'warning',
        background: '#202020',
      });
    };
  };

  function toggle() {
    setActive(!active);
  }

  useEffect(() => {
    dispatch(getCategoriesAsync());
    if (wishlist.find((el) => el.id === props.id)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, []);
  const handleNameChange = (e:any) => setChanges({...changes,
    name: e.target.innerText});
  const handleDescriptionChange = (e:any) => setChanges({...changes,
    description: e.target.innerText});
  const handleStockChange = (e:any) => setChanges({...changes,
    stock: e.target.innerText});
  const handleSizeChange = (e:any) => setChanges({...changes,
    size: e.target.innerText});
  const handlePriceChange = (e:any) => setChanges({...changes,
    price: e.target.innerText});
  return (
    <div className='productDetailBackground'>
      {
        product === null &&
            <LoadingScreen />
      }
      { product !== null &&
      <div>
        <div className='ProductDetailGridAll'>
          <div className='carouselandinfo'>
            <Carousel pictures={product.picture}/>
            <div className='ProductDetailGrid'>
              <h2 className={!editMode ?
              'ProductDetailName' :
              'editableProductDetailName'}
              suppressContentEditableWarning={true}
              contentEditable={editMode} onInput={handleNameChange}>{
                  product.name}
              </h2>
              <div className='ProductDetailRating'>
                <RatingStars rating={product.rating}/>
              </div>
              { editMode === false ?
                <div>
                  {product.categories.map((c, i) =>
                    <span key={i} className='productDetailCategories'>
                      {c.name}
                    </span>)}
                </div> :
                <div className='ProductDetailSelect'>
                  <Select onChange={handleSelectChange}
                    styles={style}
                    isMulti
                    value={productDetailCategories}
                    name='categories'
                    options={categories}>
                  </Select>
                </div>
              }
              <div className='productDetailinformation'>
                <div className='productDetailButton'>
                  <p>Price:
                    { product.priceDiscount || product.discount ?
                  <span className='ProductDetailPrices'>
                    <span className='productDetailPriceDiscount'
                      onInput={handlePriceChange}>
                      ${product.price}
                    </span>
                    {product.priceDiscount !== null ?
                    <span className='productDetailDiscount'>
                       ${product.priceDiscount}
                    </span> :
                    <span className='productDetailDiscount'>
                      ${parseFloat(product.price) -
                      parseFloat((parseFloat(product.price) *
                      product.discount/100).toFixed(2))}</span>}
                  </span> :
                    <span className={editMode ?
                    'editable' :
                    'noteditable'}
                    suppressContentEditableWarning={true}
                    contentEditable={editMode}
                    onInput={handlePriceChange}>
                      ${product.price}
                    </span>
                    }
                  </p>
                  {
                    User.role !== 'Admin' ?
                      <div className= 'productDetailUserButtons'>
                        <button className='productDetailAddToCart'
                          onClick={handleOnCart}>
                        Add to Cart
                        </button>
                        {User.id && <button onClick={() => {
                          handleOnWishlist(); toggle();
                        }}
                        className={`${active ? 'activeWishlist' :
                            'inactiveWishlist'} material-icons`}>
                          favorite
                        </button>}
                      </div>:
                      <button type='button'
                        className=' material-icons productDetailEdit'
                        onClick={() => setEditMode(!editMode)}>
                        edit
                      </button>
                  }
                  {
                      editMode &&
                      (changes?.name !== product.name ||
                          changes?.description !== product.description ||
                          changes?.price !== product.price ||
                          changes?.size !== product.size ||
                          changes?.stock !== product.stock ||
                          changes?.categories !== product.categories) ?
                      <button className='material-icons productDetailSave'
                        onClick={handleProductChange}>
                          save
                      </button> : null
                  }
                </div>
                <div className='productDetailInfo'>
                  <div className='ProductDetailColors'>
                    <span className='productDetailColorsTitle'>Color: {
                      editMode === false ?
                        changes?.color?.length ?
                        changes.color.map((el:any) =>
                          <ColorCircle key={el} color={el}
                            onClick={(e) => e.preventDefault()}/>): null :
                            <div>
                              {
                                changes?.color?.length ?
                                changes.color.map((el:any, id:number) =>
                                  <ColorCircle key={id} color={el}
                                    onClick={() => {
                                      if (changes.color.length > 1) {
                                        const toChange =
                        changes.color.filter((color:any) => el !== color);
                                        setChanges({...changes,
                                          color: toChange});
                                      } else {
                                        swal.fire({
                                          text: `Product must have at least 1
                                           color!`,
                                          icon: 'warning',
                                          background: '#202020',
                                        });
                                      }
                                    }
                                    }/>) : null
                              }
                              <input
                                className='ProductDetailColorSelector'
                                type="color"
                                value={changes.color}
                                name = "color"
                                onChange={(e)=> setColor(e.target.value)}
                              />
                              <input className='ProductDetailColorButton'
                                type="button"
                                value="Add Color"
                                onClick={() => addColor(color)} />
                            </div>
                    }</span>
                  </div>
                  <p>Stock:
                    <span className={editMode ? 'editable':'noteditable'}
                      suppressContentEditableWarning={true}
                      contentEditable={editMode}
                      onInput={handleStockChange}>
                      {product.stock}
                    </span>
                  </p>
                  <p>Size:
                    <span className={editMode ? 'editable':'noteditable'}
                      suppressContentEditableWarning={true}
                      contentEditable={editMode} onInput={handleSizeChange}>
                      {product.size}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='detailDescription'>
            <h3 className='productDetailDescritionTitle'>Description</h3>
            <p className={editMode ?
             'editableProductDetailDescription':
              'ProductDetailDescription'}
            suppressContentEditableWarning={true}
            contentEditable={editMode} onInput={handleDescriptionChange}>
              {product.description}
            </p>
          </div>
        </div>
        <UserReviews id={id}/>
      </div>
      }
    </div>
  );
}

export default ProductDetail;
