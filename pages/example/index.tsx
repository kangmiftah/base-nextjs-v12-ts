import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { examplePropsType } from "../../@types/redux/slices/example/exampleSlices";
import exampleService, {
   getAllPosts,
   useGetAllPostsQuery,
   useLazyGetAllPostsQuery,
} from "../../redux/services/examples";
import { exampleActions } from "../../redux/slices/example/exampleSlices";
import { RootState, wrapper } from "../../redux/store";
const Home = ({ title }: examplePropsType) => {
   const postsState: RootState = useSelector((state) => state);
   const [test, setTest] = useState(false);
   const [fetch, allPost] = useLazyGetAllPostsQuery();
   // const { isLoading, data } : { isLoading: Boolean, data: [] | any} = allPost;
   useEffect(function () {}, [test]);
   console.log(allPost);
   // const { data } = allPost
   if (allPost.isLoading)
      return <h2 className=" text-3xl font-bold mb-5">...Loading</h2>;
   return (
      <div className="p-7">
         <button className="btn bg-blue-500 text-white" onClick={() => fetch(undefined)}>
            Refresh
         </button>
         <h2 className=" text-3xl font-bold mb-5">{title}</h2>
         <ul className="list-disc list-inside">
            {( allPost.data || []).map(function (x: any, i: number) {
               return <li key={i}>{x.title}</li>;
            })}
         </ul>
      </div>
   );
};

export const getServerSideProps = wrapper.getServerSideProps(
   (store) => async () => {
      store.dispatch(getAllPosts.initiate(undefined));
      await Promise.all(
         store.dispatch(exampleService.util.getRunningQueriesThunk())
      );

      const { data } =
         getAllPosts.select(undefined)(store.getState());
      return {
         props: {
            title: "This example page SSR",
            data,
         },
      };
   }
);

export default Home;
