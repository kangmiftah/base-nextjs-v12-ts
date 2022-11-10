import React, { ReactElement } from "react";
import Layout from "../../_layouts";

export default function AdminLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}
