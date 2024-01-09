import React, { useEffect } from 'react';
import Sidebar from "./SideBar";
import "./dashboard.css";
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from "../../actions/productsAction";
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';





const Dashboard = () => {


    Chart.register(CategoryScale);
    Chart.register(...registerables);

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products);
    const { orders } = useSelector(state => state.allOrders)
    const { users } = useSelector(state => state.allUsers);



    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());


    }, [dispatch]);





    let outOfStock = 0;

    products && products.forEach((item) => {

        if (item.stock === 0) {
            outOfStock += 1;
        }

    });


    let totalAmount = 0;
    orders && orders.forEach(item => {
        totalAmount += item.totalPrice;
    });






    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            },
        ],
    };


    const DoughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "35014F"],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };


    return (

        <div className="dashboard">
            <Sidebar />
            <div className="dashboardContainer">

                <Typography component={"h1"}>Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br />₹{totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to={"/admin/products"}>
                            <p>Product</p>
                            <p>{products && products.length} </p>
                        </Link>
                        <Link to={"/admin/orders"}>
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to={"/admin/users"}>
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>


                <div className='lineChart'>
                    <Line
                        data={lineState}
                        options={null}
                    />
                </div>

                <div className='doughnutChart'>
                    <Doughnut
                        data={DoughnutState} />

                </div>

            </div>
        </div>
    )
}

export default Dashboard