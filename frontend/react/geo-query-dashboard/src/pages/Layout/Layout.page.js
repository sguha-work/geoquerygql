import { Outlet } from "react-router-dom";
function Layout() {
    return (
        <>
            <h1>Geo location view application</h1>
            <Outlet></Outlet>
        </>
    );
}
export default Layout;