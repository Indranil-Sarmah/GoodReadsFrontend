import React from "react";
import Menu from "./Menu";
import  './style.css'


const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Menu />
        <div className="text-center text-light jumbotron p-1">
            <h2 >{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Layout;