import { ReactElement } from "react"
import AdminLayout from "../layout"


const Page = () => {
  return (
    <h1 className="text-3xl font-bold underline">
      this is page of admin
    </h1>
  )
}
Page.getLayout = AdminLayout
export default Page;