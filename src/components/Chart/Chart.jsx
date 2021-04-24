import React, { useState, useEffect } from 'react'
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

function Chart({ data: { confirmed, deaths, recovered }, country }) {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length !== 0
        ? 
            <Line 
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: "Infected",
                        borderColor: "#150e56",
                        fill: true
                    }, 
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: "Deaths",
                        borderColor: "#7b113a",
                        backgroundColor: "rgba(255, 0, 0, 0.05)",
                        fill: true
                    }]
                }}
            />
        :
            null
    );

    const barChart = (
        confirmed
        ?
            (
                <Bar 
                    data={{
                        labels: ["Infected", "Recovered", "Deaths"],
                        datasets: [{
                            label: "People",
                            backgroundColor: [
                                "#150e56",
                                "#1597bb",
                                "#7b113a"
                            ],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}`}
                    }}
                />
            )
        :
            null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart
