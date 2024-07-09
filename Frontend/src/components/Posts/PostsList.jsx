import { useEffect } from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dislikePostsAction, fetchPostsAction, likePostsAction } from "../../redux/slices/posts/postSlices";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";
import LoadingComponent from "../../util/LoadingComponent";
import DateFormatter from "../../util/DateFormatter";

export default function PostsList() {
  //select posts from store
  const posts = useSelector(state => state?.posts);
  const {postList, appErr, serverErr, loading, likes, dislikes} = posts;
  
  //select categories from store
  const category = useSelector(state=>state.category);
  const {categoryList, appErr : catAppErr, serverErr: catServerErr, loading: catLoading} = category;
  //dispatch
  const dispatch = useDispatch();
  //fetch posts
  useEffect(() => {
    dispatch(fetchPostsAction(""));
  }, [dispatch, likes, dislikes])

  //fetch categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch])


  return (
    <>
      <section>
        <div class="py-20 bg-slate-100 min-h-screen radius-for-skewed">
          <div class="container mx-auto px-4">
            <div class="mb-16 flex flex-wrap items-center">
              <div class="w-full lg:w-1/2">
                <span class="text-blue-600 font-bold">
                  Latest Posts from our awesome authors
                </span>
                <h2 class="text-4xl text-black lg:text-5xl font-bold font-heading">
                  Latest Post
                </h2>
              </div>
              <div class=" block text-right w-1/2">
                {/* View All */}
                <button onClick={()=>dispatch(fetchPostsAction(""))} class="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-black hover:bg-slate-700 text-white font-bold leading-loose transition duration-200">
                  View All Posts
                </button>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3">
              <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div class="py-4 px-6 bg-white shadow rounded">
                  <h4 class="mb-4 text-black font-bold uppercase">
                    Categories
                  </h4>
                  <ul>
                    {/* categories goes here */}
                    {catLoading? (<LoadingComponent />) : catAppErr || catServerErr ? (<h1> {catAppErr} {catServerErr} </h1>) : 
                categoryList?.length <=0? (<h1 className="text-white text-lg text-center">No post found</h1>) :  (categoryList?.map(category=>(
                    <li key={category?._id}>
                      <p onClick={()=>dispatch(fetchPostsAction(category?.title))} className="block cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-black">
                        {category?.title} 
                      </p>
                    </li>
                )))}
                  </ul>
                </div>
              </div>
              <div class="w-full lg:w-3/4">   

                {/* posts goes here */}
                { appErr || serverErr ? (<h1 className="text-red-500 text-center text-lg"> {appErr} {serverErr} </h1>) : 
                postList?.length <=0? (<h1 className="text-black text-lg text-center">No post found</h1>) : (postList?.map(post=>(
                  <div key={post?._id} class="flex flex-wrap bg-white mx-3  mb-10">
                  <div class="mb-10  w-full lg:w-1/4 px-3">
                    <Link>
                      {/* Post image */}
                      <img 
                        class="w-full h-full object-cover rounded"
                        src={post?.image}
                        alt=""
                      />
                    </Link>
                    {/* Likes, views dislikes */}
                    <div className="flex flex-row bg-white border rounded-md justify-center w-full  items-center ">
                      {/* Likes */}
                      <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                        {/* Togle like  */}
                        <div onClick={()=>dispatch(likePostsAction(post?._id))} className="">
                          <ThumbUpIcon className="h-7 w-7 text-black cursor-pointer" />
                        </div>
                        <div className="pl-2 text-gray-600">{post?.likes?.length}</div>
                      </div>
                      {/* Dislike */}
                      <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                        <div onClick={()=>dispatch(dislikePostsAction(post?._id))}>
                          <ThumbDownIcon className="h-7 w-7 cursor-pointer text-black" />
                        </div>
                        <div className="pl-2 text-black">{post?.dislikes?.length}</div>
                      </div>
                      {/* Views */}
                      <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                        <div>
                          <EyeIcon className="h-7 w-7  text-black" />
                        </div>
                        <div className="pl-2 text-black">
                          {post?.numOfViews}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="w-full lg:w-3/4 px-3">
                    <Link class="hover:underline">
                      <h3 class="mb-1 text-2xl text-blue-700 font-bold font-heading">
                        {/* {capitalizeWord(post?.title)} */} {post?.title}
                      </h3>
                    </Link>
                    <p class="text-black">{post?.description}</p>
                    {/* Read more */}
                    <Link to={`/posts/${post?._id}`} className="text-blue-700 hover:underline">
                      Read More..
                    </Link>
                    {/* User Avatar */}
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <Link>
                          <img
                            className="h-10 w-10 rounded-full"
                            src={post?.user?.profilePhoto}
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          <Link to={`/profile/${post?.user?._id}`} className="text-black hover:underline ">
                            {post?.user?.firstName} {post?.user?.lastName}
                          </Link>
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time>
                            <DateFormatter date={post?.createdAt} />
                          </time>
                          <span aria-hidden="true">&middot;</span>
                        </div>
                      </div>
                    </div>
                    {/* <p class="text-gray-500">
                          Quisque id sagittis turpis. Nulla sollicitudin rutrum
                          eros eu dictum...
                        </p> */}
                  </div>
                </div>
                )))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
