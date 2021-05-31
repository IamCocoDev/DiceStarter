import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {wishlistsReducer} from '../../app/reducers/wishlistReducer';
import {deleteAllWishlist, getProductsInWishlist, saveWishlist}
  from '../../app/actions/wishlistActions';
import {userInfo} from '../../app/reducers/registerReducer';
import swal from 'sweetalert2';
import './wishlist.css';
import ProductCard from '../productCard/productCard';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const wishlistProducts = useAppSelector(wishlistsReducer);
  const productsInWishlist = [...wishlistProducts];
  const userInf = useAppSelector(userInfo);
  const userId = userInf.id;
  const [products, setProducts] = React.useState([]);
  const handleSave = () => {
    dispatch(saveWishlist(userId));
  };
  console.log(productsInWishlist);
  const handleDeleteWishlist = () => {
    if (productsInWishlist.length <= 0) {
      swal.fire({
        text: 'You already deleted all the products from this wishlist!',
        icon: 'info',
      });
    } else {
      swal.fire({
        title: 'Are you sure?',
        text: 'This will delete the whole wishlist!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
          .then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteAllWishlist(userId))
                  .then((r) => {
                    if (r !== 'error') {
                      dispatch(getProductsInWishlist(userId));
                      findDuplicates(productsInWishlist);
                      swal.fire({
                        text: 'Wishlist deleted successfully',
                        icon: 'info',
                      });
                    } else {
                      swal.fire({
                        text: 'Oops, something went wrong',
                        icon: 'error',
                      });
                    }
                  }).catch((err) => console.error(err));
            }
          });
    }
  };


  const findDuplicates = (array) => {
    if (array.length !== 0) {
      const products = [array[0]];
      for (let i = 1; i < array.length; i++) {
        const product = products.find((p) => p.id === array[i].id);
        if (product === undefined) {
          products.push(array[i]);
        }
        if (product !== undefined) {
          product.amount += array[i].amount;
        };
      }
      setProducts(products);
    } else {
      setProducts([]);
    }
  };
  useEffect(() => {
    dispatch(getProductsInWishlist(userId));
    findDuplicates(productsInWishlist);
  }, []);

  useEffect(() => {
    findDuplicates(productsInWishlist);
  }, [wishlistProducts]);

  return (
    <div className='wishlist'>
      <div className='wishlistItems'>
        {products.length > 0 ?
          products.map((product, index) =>
            <ProductCard
              key={index}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              stock={product.stock}
              rating={product.rating}
              priceDiscount={product.priceDiscount}
              discount={product.discount}
              categories={['dnd']} />) :
          <div>No products in wishlist</div>
        }
      </div>
      <button className='wishlistSaveButton'
        onClick={handleSave} >Save Wishlist</button>
      <button className='wishlistDeleteButton'
        onClick={handleDeleteWishlist} >Delete Wishlist</button>
    </div>
  );
};
export default Wishlist;
