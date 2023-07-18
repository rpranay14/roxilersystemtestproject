import React, { useState } from 'react'
import { axiosapi } from '../api/axiosapi'
import BarChart from '../Components/BarChart';
import PieChart from '../Components/PieChart';

const HomePage = () => {
    const [loading, setloading] = useState(false)
    const [month, setmonth] = useState('');
    const [pieChartData, setPieChartData] = useState(null);
    const [barChartData, setBarChartData] = useState(null);
    const [statistics, setStatistics] = useState(null);


    const getData = async (e) => {
        setmonth(e.target.value)
        console.log(e.target.value)
        if (e.target.value !== '') {
            setloading(true)
            const response = await axiosapi.get(`order/alldata/${e.target.value}`);
            setmonth(e.target.value)
            setStatistics(response.data.statisticsData)
            setPieChartData(response.data.pieChartData)
            setBarChartData(response.data.barChartData)
            console.log(response.data)
            setloading(false)
        }

    }
    return (
        <div>
            <div className='flex gap-12 mx-24 justify-between items-center  mt-5'>

                <div>

                    <select className="ml-2 px-4 py-1 border border-gray-300 rounded-md focus:outline-none " value={month} onChange={(e) => getData(e)}>
                        <option value='' >Select a month</option>
                        <option value={1}>January</option>
                        <option value={2}>February</option>
                        <option value={3}>March</option>
                        <option value={4}>April</option>
                        <option value={5}>May</option>
                        <option value={6}>June</option>
                        <option value={7}>July</option>
                        <option value={8}>August</option>
                        <option value={9}>September</option>
                        <option value={10}>October</option>
                        <option value={11}>November</option>
                        <option value={12}>December</option>
                    </select>

                </div>



            </div>
            {loading ? <p className=" mt-12 mb-5 mx-24">Loading...</p> :
                <div> {statistics === null ? <></> :
                    <div className='flex justify-between items-center mt-12 mb-5 mx-24'>
                        <p>Number of Sold Items:-<span className='font-semibold'>{statistics.noOfSoldItems} item</span></p>
                        <p>Total sale Amount:-<span className='font-semibold'>Rs.{statistics.totalSaleAmount}</span></p>
                        <p>Number of Unsold Items:-<span className='font-semibold'>{statistics.noOfUnsoledItems} item</span></p>
                    </div>}
                    <div className='flex gap-20 mx-24'>

                        {barChartData === null ? <></> : <BarChart className="w-[50%]" barChartData={barChartData} />}
                        {pieChartData === null ? <></> : <PieChart className="w-[60%]" pieChartData={pieChartData} />}
                    </div>

                </div>}


        </div>
    )
}

export default HomePage
