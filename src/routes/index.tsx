import { BrowserRouter, Route, Routes } from "react-router-dom"
import Page from "../pages"
import Layout from "../layout"

const RouteApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <Layout>
                        <Page.Home/>
                    </Layout>}
                />
                <Route path="/cart" element={
                    <Layout>
                        <Page.Cart/>
                    </Layout>
                }/>
                <Route path="/history" element={
                    <Layout>
                        <Page.History/>
                    </Layout>
                }/>
                <Route path="/history/:id" element={
                    <Layout>
                        <Page.HistoryDetail/>
                    </Layout>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteApp