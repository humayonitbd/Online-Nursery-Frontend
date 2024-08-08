import { Button } from '@/components/ui/button';
import productApi from '@/redux/features/product/productApi';
import { useNavigate, useParams } from 'react-router-dom';
import SmallLoading from '../SharedPage/Loading/SmallLoading';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Plus, Star, StarIcon } from 'lucide-react';
import Swal from 'sweetalert2';
import { ReviewModal } from '@/components/ReviewModal/ReviewModal';
import reviewApi from '@/redux/features/review/reviewApi';
import { TProduct, TReplayReview, TReview, TReviewLike } from '@/types';
import { ReviewUpdateModal } from '@/components/ReviewUpdateModal/ReviewUpdateModal';
import { addBookingProduct } from '@/redux/features/bookingProduct/bookingProductSlice';
import { ReviewReplayModal } from '@/components/ReviewReplayModal/ReviewReplayModal';
import { notUserFn, notUserReviewMessage } from '@/utils/notUserFn';
import { ReplayReviewUpdate } from '@/components/ReplayReviewUpdate/ReplayReviewUpdate';



export type TLikeReviewResult ={
  liked: boolean;
  likedId?: string;
}

const ProductDetails = () => {
    const user = useAppSelector((state)=> state.auth.user);
      const dispatch = useAppDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
      const { data:product, isLoading } = productApi.useGetSingleProductQuery(id as string);
      const { data: reviews, isLoading:reviewLoading } =
        reviewApi.useGetAllReviewQuery(id, { skip: isLoading });
      const [deleteReview] = reviewApi.useSingleDeleteReviewMutation();
      const [addReviewLike] = reviewApi.useAddReviewLikeMutation();
      const { data: reviewLikes } = reviewApi.useAllReviewLikeQuery(
        user?.email,
        { skip: isLoading }
      );
      const { data: replayReviews } = reviewApi.useGetReplayReviewQuery(id, {
        skip: reviewLoading,
      });
      const [deleteUpdateReviewLike] = reviewApi.useDeleteUpdateReviewLikeMutation();
       const [deleteReplayReview] = reviewApi.useDeleteReplayReviewMutation();
      

 const renderStars = (rating: number) => {
   const stars = [];
   for (let i = 1; i <= 5; i++) {
     stars.push(
       i <= rating ? (
         <Star key={i} className="text-[#AFD136] fill-[#AFD136] " />
       ) : (
         <StarIcon key={i} className="text-[#AFD136]" />
       )
     );
   }
   return stars;
 };

 const formatDate = (isoDate: string): string => {
   const date = new Date(isoDate);
   return date.toLocaleDateString("en-US", {
     month: "long",
     day: "numeric",
     year: "numeric",
   });
 };
  

/// review delete handler 

const deleteReviewHandler = async(id:string)=>{
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await deleteReview(id).unwrap();
      if (res.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Comment has been deleted.",
          icon: "success",
        });
      }
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: "Failed to delete the Comment.",
      icon: "error",
    });
  }

}
const deleteReplayReviewHandler = async (id: string) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await deleteReplayReview(id).unwrap();
      if (res.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Comment has been deleted.",
          icon: "success",
        });
      }
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: "Failed to delete the Comment.",
      icon: "error",
    });
  }
};


    const notUserReviewHandler=()=>{
      if(!user?.email){
        return Swal.fire({
          icon: "error",
          title: `You don't login user!! Please login!`,
          showConfirmButton: false,
          timer: 1200,
        }); 
      }
      navigate('/login');
    }

    const addToCartHandler = async (product: TProduct) => {
      try {
        const res = await dispatch(addBookingProduct(product));

        if (res) {
          Swal.fire({
            icon: "success",
            title: "Add to Cart Successfull!!",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to Add to Cart",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    };

  const likeHandler =async(id:string)=>{
    if (!user?.email) {
      return Swal.fire({
        icon: "error",
        title: `You don't login user!! Please login!`,
        showConfirmButton: false,
        timer: 1200,
      });
    }
    const data = {
      email: user?.email,
      like: true,
      reviewId: id,
    };
    try {
      const res = await addReviewLike(data).unwrap();
    if (res?.success) {
        console.log('like', res);
      }
    } catch (error) {
      console.log("like error", error);
    }

  }
 

  const likeDeleteHandler = async (id: string, reviewIdDel:string) => {
    const deleteData = {
      email: user?.email,
      like: false,
      reviewId: reviewIdDel,
    };
    console.log("delete like", deleteData);
    try {
      const res = await deleteUpdateReviewLike({id, deleteData}).unwrap();
      if (res?.success) {
        console.log("delete like", res);
      }
    } catch (error) {
      console.log("delete like error", error);
    }
  };

 const likeReviewHandler = (reviewId: string): TLikeReviewResult => {
   const likedReview = reviewLikes?.data?.find(
     (reviewLike: TReviewLike) =>
       user?.email === reviewLike.email &&
       reviewId === reviewLike?.reviewId &&
       reviewLike.like
   );
   return { liked: !!likedReview, likedId: likedReview?._id };
 };

 if (isLoading) {
   return <SmallLoading />;
 }
//  console.log('like review handler', likeReviewHandler())
 console.log("replay review ", replayReviews?.data);

    return (
      <div className="w-11/12 mx-auto bg-gray-900">
        <div className="flex flex-col items-center p-4 bg-gray-900 text-white  pt-8 lg:py-16">
          <div className="max-w-7xl w-full bg-gray-800 rounded-lg shadow-lg p-6 animate__animated animate__fadeIn">
            <div className="flex flex-col md:flex-row">
              <img
                src={product?.data?.image}
                alt="product Poster"
                className="w-full md:w-1/2 h-auto mb-4 rounded-lg shadow-lg md:mr-6 transform hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col justify-between">
                <div className="text-gray-400 mb-4">
                  <div>
                    <div className="flex justify-start">
                      <span className="mr-2">Ratings</span>{" "}
                      {renderStars(product?.data?.rating).map((start) => (
                        <div className="flex justify-start">{start}</div>
                      ))}
                    </div>
                  </div>
                  <h1 className="text-2xl font-semibold mb-4">
                    Title:{" "}
                    <span className="text-slate-200">
                      {product?.data?.title}
                    </span>
                  </h1>
                  <p className="mb-2 font-semibold">
                    Category:
                    <span className="text-slate-200 ml-1">
                      {product?.data?.category}
                    </span>
                  </p>
                  <p className="mb-2 font-semibold">
                    Brand:
                    <span className=" text-slate-200 ml-1">
                      {product?.data?.brand}
                    </span>
                  </p>
                  <p className="mb-2 font-semibold">
                    Stock:
                    <span className=" text-slate-200 ml-1">
                      {product?.data?.stock}
                    </span>
                  </p>
                  <p className="mb-2 font-semibold">
                    Price:
                    <span className=" text-slate-200 ml-1">
                      $ {product?.data?.price}
                    </span>
                  </p>
                  <p className="mb-2 font-semibold">
                    Description:
                    <span className=" text-slate-200 ml-1">
                      {product?.data?.description}
                    </span>
                  </p>
                </div>
                <div className="flex space-x-4 mb-4">
                  <Button
                    onClick={() => addToCartHandler(product.data)}
                    className="w-full text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-6 px-4 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300"
                  >
                    Add-to-Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* other section // you can use or no (optional) */}
        <div className="px-14 pb-16 ">
          <div className="flex justify-between items-end ">
            <p className="text-base text-slate-200 m-0 p-0 font-semibold">
              All Users Reviews
            </p>
            {user && user?.email ? (
              <>
                <button>
                  <ReviewModal product={product?.data} />
                </button>
              </>
            ) : (
              <>
                <button>
                  <Button
                    onClick={notUserReviewHandler}
                    className="w-full mb-2 text-base bg-gradient-to-r from-[#76AE42] to-[#AFD136] text-white py-6 px-10 rounded hover:from-[#AFD136] hover:to-[#76AE42] transition-colors duration-300"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Review
                  </Button>
                </button>
              </>
            )}
          </div>
          <div className=" pb-4">
            <hr className=" text-slate-200" />
          </div>
          <div>
            <div className="">
              {reviews?.data?.length === 0 ? (
                <>
                  <div>
                    <p className="text-base text-[#76AE42] text-semibold  ">
                      Product Review not available..!
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {reviews?.data?.map((review: TReview) => (
                    <div key={review?._id}>
                      <div className="flex justify-start items-center  text-slate-200 mb-4">
                        <div className="flex justify-start items-start mr-2">
                          <img
                            src={review?.ratingUserImg}
                            className="h-10 w-10 rounded-full mr-2"
                            alt=""
                          />
                          <div>
                            <div className="bg-[#2b3747de] p-2 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl min-w-48 max-w-96">
                              <div>
                                <p className="leading-3 font-semibold text-base">
                                  {review?.ratingUserName}
                                </p>
                                <p className="text-slate-200 text-sm ">
                                  {formatDate(review?.reviewAddDate)}
                                </p>
                              </div>
                              <div>{review?.reviewMessage}</div>
                            </div>
                            <div className="flex justify-between items-center px-2">
                              <div>
                                {likeReviewHandler(review._id).liked ? (
                                  <button
                                    onClick={() =>
                                      likeDeleteHandler(
                                        likeReviewHandler(review._id).likedId ||
                                          "",
                                        review?._id
                                      )
                                    }
                                    className="mr-5 text-blue-500"
                                  >
                                    Unlike
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => likeHandler(review._id)}
                                    className="mr-5"
                                  >
                                    Like
                                  </button>
                                )}
                                <button>
                                  <ReviewReplayModal
                                    review={review}
                                    productId={product?.data?._id}
                                  />
                                </button>
                              </div>

                              <button>
                                <span>{review?.likeTotal}</span>
                                👍<span className="-m-3">❤</span>😊
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <div className="dropdown -top-3">
                            <div tabIndex={0} role="button" className="">
                              <div className="">
                                <button className=" btn btn-sm btn-square bg-[#2b3747de] text-slate-200 hover:bg-[#2b3747de] ">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-5 w-5 stroke-current"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <ul
                              tabIndex={0}
                              className="menu menu-sm text-gray-800 dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow"
                            >
                              <li>
                                {user && user?.email ? (
                                  <>
                                    {review?.reviewUserEmail === user?.email ? (
                                      <>
                                        <ReviewUpdateModal id={review?._id} />
                                      </>
                                    ) : (
                                      <>
                                        <a
                                          onClick={() => notUserReviewMessage()}
                                        >
                                          Edit
                                        </a>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <a onClick={() => notUserFn(user)}>Edit</a>
                                  </>
                                )}
                              </li>
                              {user && user?.email ? (
                                <>
                                  {review?.reviewUserEmail === user?.email ? (
                                    <>
                                      <li
                                        onClick={() =>
                                          deleteReviewHandler(review?._id)
                                        }
                                      >
                                        <a>Delete</a>
                                      </li>
                                    </>
                                  ) : (
                                    <>
                                      <li
                                        onClick={() => notUserReviewMessage()}
                                      >
                                        <a>Delete</a>
                                      </li>
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  <li onClick={() => notUserFn(user)}>
                                    <a>Delete</a>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-14">
                        {replayReviews?.data
                          ?.filter(
                            (replayReview: TReplayReview) =>
                              replayReview.reviewId === review._id
                          )
                          ?.map((replayReview: TReplayReview) => (
                            <div
                              key={replayReview?._id}
                              className="flex justify-start items-center text-slate-200 mb-4"
                            >
                              <div className="flex justify-start items-start mr-2">
                                <img
                                  src={replayReview?.ratingUserImg}
                                  className="h-10 w-10 rounded-full mr-2"
                                  alt=""
                                />
                                <div>
                                  <div className="bg-[#2b3747de] p-2 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl min-w-48 max-w-96">
                                    <div>
                                      <p className="leading-3 font-semibold text-base">
                                        {replayReview?.ratingUserName}
                                      </p>
                                      <p className="text-slate-200 text-sm ">
                                        {formatDate(
                                          replayReview?.reviewAddDate
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      {replayReview?.replayReviewMessage}
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center px-2">
                                    {/* <div>
                                      {likeReviewHandler(replayReview._id)
                                        .liked ? (
                                        <button
                                          onClick={() =>
                                            likeDeleteHandler(
                                              likeReviewHandler(
                                                replayReview._id
                                              ).likedId || "",
                                              replayReview?._id
                                            )
                                          }
                                          className="mr-5 text-blue-500"
                                        >
                                          Unlike
                                        </button>
                                      ) : (
                                        <button
                                          onClick={() =>
                                            likeHandler(replayReview._id)
                                          }
                                          className="mr-5"
                                        >
                                          Like
                                        </button>
                                      )}
                                      <button>
                                        <ReviewReplayModal
                                review={replayReview}
                                productId={product?.data?._id}
                              />
                                        Replay
                                      </button>
                                    </div> */}
                                    <div>
                                      <button className="mr-5">Like</button>
                                      <button>Replay</button>
                                    </div>
                                    <button>
                                      <span>{replayReview?.likeTotal}</span>
                                      👍<span className="-m-3">❤</span>😊
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <div className="dropdown -top-3">
                                  <div tabIndex={0} role="button" className="">
                                    <div className="">
                                      <button className="btn btn-sm btn-square bg-[#2b3747de] text-slate-200 hover:bg-[#2b3747de]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          className="inline-block h-5 w-5 stroke-current"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                          ></path>
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                  
                                  <ul
                                    tabIndex={0}
                                    className="menu menu-sm text-gray-800 dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow"
                                  >
                                    <li>
                                      {user && user?.email ? (
                                        <>
                                          {replayReview?.replayReviewUserEmail ===
                                          user?.email ? (
                                            <>
                                              <ReplayReviewUpdate
                                                id={replayReview?._id}
                                                message={
                                                  replayReview.replayReviewMessage
                                                }
                                              />
                                            </>
                                          ) : (
                                            <>
                                              <a
                                                onClick={() =>
                                                  notUserReviewMessage()
                                                }
                                              >
                                                Edit
                                              </a>
                                            </>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          <a onClick={() => notUserFn(user)}>
                                            Edit
                                          </a>
                                        </>
                                      )}
                                    </li>
                                    {user && user?.email ? (
                                      <>
                                        {replayReview?.replayReviewUserEmail ===
                                        user?.email ? (
                                          <>
                                            <li
                                              onClick={() =>
                                                deleteReplayReviewHandler(
                                                  replayReview?._id
                                                )
                                              }
                                            >
                                              <a>Delete</a>
                                            </li>
                                          </>
                                        ) : (
                                          <>
                                            <li
                                              onClick={() =>
                                                notUserReviewMessage()
                                              }
                                            >
                                              <a>Delete</a>
                                            </li>
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <li onClick={() => notUserFn(user)}>
                                          <a>Delete</a>
                                        </li>
                                      </>
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductDetails;