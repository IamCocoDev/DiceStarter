import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {wishlistsReducer} from '../../../app/reducers/wishlistReducer';
import {deleteAllWishlist, getProductsInWishlist}
  from '../../../app/actions/wishlistActions';
import {userInfo, userToken} from '../../../app/reducers/registerReducer';
import swal from 'sweetalert2';
import './wishlist.css';
import ProductCard from '../../HomeCatalogue/productCard/productCard';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const wishlistProducts = useAppSelector(wishlistsReducer);
  const userInf = useAppSelector(userInfo);
  const userId = userInf.id;
  const token = useAppSelector(userToken);
  const handleDeleteWishlist = () => {
    if (wishlistProducts.length <= 0) {
      swal.fire({
        text: 'You already deleted all the products from this wishlist!',
        icon: 'info',
        background: '#202020',
      });
    } else {
      swal.fire({
        title: 'Are you sure?',
        text: 'This will delete the whole wishlist!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#74009D',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        background: '#202020',
      })
          .then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteAllWishlist(userId, token))
                  .then((r) => {
                    if (r !== 'error') {
                      dispatch(getProductsInWishlist(userId, token));
                      swal.fire({
                        text: 'Wishlist deleted successfully',
                        icon: 'info',
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
            }
          });
    }
  };

  useEffect(() => {
    dispatch(getProductsInWishlist(userId, token));
  }, []);

  return (
    <div className='wishlistGrid'>
      <div className='wishlistItems'>
        {wishlistProducts.length > 0 ?
          wishlistProducts.map((product, index) =>
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
              categories={product.categories ?
                product.categories.map((el) => el.name) : []} />) :
          <div className='wishlistNoProducts'>No products in wishlist</div>
        }
      </div>
      <div className='wishlistDeleteButtonBox'>
        {
          wishlistProducts.length > 0 ?
          <button className='wishlistDeleteButton'
            onClick={handleDeleteWishlist} >
            <i className='material-icons'>delete</i></button>:null
        }
      </div>
    </div>
  );
};
export default Wishlist;
