import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {wishlistsReducer} from '../../../app/reducers/wishlistReducer';
import {deleteAllWishlist, getProductsInWishlist}
  from '../../../app/actions/wishlistActions';
import {userInfo} from '../../../app/reducers/registerReducer';
import swal from 'sweetalert2';
import './wishlist.css';
import ProductCard from '../../HomeCatalogue/productCard/productCard';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const wishlistProducts = useAppSelector(wishlistsReducer);
  const userInf = useAppSelector(userInfo);
  const userId = userInf.id;
  console.log(wishlistProducts);
  const handleDeleteWishlist = () => {
    if (wishlistProducts.length <= 0) {
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

  useEffect(() => {
    dispatch(getProductsInWishlist(userId));
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
