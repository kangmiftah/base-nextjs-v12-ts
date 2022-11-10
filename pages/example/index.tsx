import { examplePropsType } from "../../@types/redux/slices/example/exampleSlices"
import { exampleActions } from "../../redux/slices/example/exampleSlices"
import {  wrapper } from "../../redux/store"
import apiFetch from "../../_modules/api"

const Home = ({title, data = []} : examplePropsType)=>{
   
   return <div className="p-7">
      <h2 className=" text-3xl font-bold mb-5">{title}</h2>
      <ul className="list-disc list-inside">
         {
            data.map(function(x : any, i:number){
               return <li key={i}>{ x.title}</li>
            })
         }
      </ul>
   </div> 
}



export const getServerSideProps = wrapper.getServerSideProps(
   (store)=> async () => {
      let data = []
      store.dispatch(exampleActions.toggleSidebar())
      const resp = await apiFetch.get("/posts", {
         headers: {
            "Content-Type" : "*/*"
         }
      })
      if(resp.status === 200) data = resp.data;
      let props : examplePropsType;
      props = {
         title: "this is example pages",
         data
      }
      return {
         props 
      }
   }
)


export default Home;