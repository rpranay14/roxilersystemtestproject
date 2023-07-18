const express = require('express');
const axios = require('axios');
const order = require('../models/order')
const axiosapi = axios.create({
    baseURL: 'https://s3.amazonaws.com/roxiler.com/product_transaction.json'
})
const axiosapis = axios.create({
    baseURL: 'https://productdatabackend.onrender.com/'
})


//Router to get Data from external api and store it into mongodb database
const orderRouter = express.Router();
orderRouter.route('/')
    .get(async (req, res, next) => {
        const response = await axiosapi.get();
        console.log(response.data)
        order.insertMany(response.data)
            .then((product) => {
                res.json({ success: true })
            }).catch((error) => console.log(error))


    })


//Router to get noOfSoldItems,totalSaleAmount,noOfUnsoledItems
orderRouter.route('/statistics/:month')
    .get((req, res, next) => {
        const month = req.params.month;
        console.log(month)
        order.find({
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, month]
            }
        })
            .then((orders) => {
                const filteredOrders = orders.filter((order) => order.sold === true);
                const noOfSoldItems = filteredOrders.length
                const totalSaleAmount = filteredOrders.reduce((a, c) => { return a + c.price }, 0);
                const noOfUnsoledItems = orders.length - noOfSoldItems;
                res.json({ noOfSoldItems: noOfSoldItems, totalSaleAmount: totalSaleAmount, noOfUnsoledItems: noOfUnsoledItems })


            })
    })


//Router to get data for pie chart
orderRouter.route('/piechart/:month')
    .get((req, res, next) => {
        const month = req.params.month;
        console.log(month)
        order.find({
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, month]
            }
        })
            .then((orders) => {
                const category = {}
                orders.map((order) => {
                    if (category.hasOwnProperty(order.category)) {
                        category[order.category]++
                    }
                    else {
                        category[order.category] = 1
                    }
                })

                res.json({ category: category })
            })
    })


//Router to get data for bar chart
orderRouter.route('/barchart/:month')
    .get((req, res, next) => {
        const month = req.params.month;
        console.log(month)
        order.find({
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, month]
            }
        })
            .then((orders) => {
                const priceRanges = [
                    { min: 0, max: 100 },
                    { min: 101, max: 200 },
                    { min: 201, max: 300 },
                    { min: 301, max: 400 },
                    { min: 401, max: 500 },
                    { min: 501, max: 600 },
                    { min: 601, max: 700 },
                    { min: 701, max: 800 },
                    { min: 801, max: 900 },
                    { min: 901, max: Infinity }
                ];
                const result = priceRanges.map((range) => {
                    const count = orders.filter((order) => order.price >= range.min && order.price <= range.max).length;
                    return { range, count }
                })

                res.json({ count: result })
            })
    })



//Router to get data of above three api
orderRouter.route('/alldata/:month')
    .get(async (req, res, next) => {
        const month = req.params.month;
        const statisticsData = await axiosapis.get(`order/statistics/${month}`);
        const pieChartData = await axiosapis.get(`order/piechart/${month}`);
        const barChartData = await axiosapis.get(`order/barchart/${month}`);

        res.json({ statisticsData: statisticsData.data, pieChartData: pieChartData.data, barChartData: barChartData.data })
    })

module.exports = orderRouter