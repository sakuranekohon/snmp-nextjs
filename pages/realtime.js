import { useEffect, useRef, useState } from 'react';
import Footer from "../component/Footer";
import PageHead from "../component/Head";
import Nav from "../component/Nav";
import styles from '../styles/Home.module.css';
import Chart from 'chart.js/auto';

export default function Rmon() {
    const [vlanData, setVlanData] = useState(Array.from({ length: 9 }, () => ({ inputData: [], outputData: [], timeLabels: [] })));
    const chartRefs = useRef(Array.from({ length: 9 }, () => null));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    Array.from({ length: 9 }, (_, i) => fetch(`/api/realtime?vlan=${i + 1}`))
                );
                const trafficData = await Promise.all(
                    responses.map(response => response.ok ? response.json() : null)
                );
                updateData(trafficData);
            } catch (error) {
                console.error('Failed to fetch traffic data:', error);
            }
        };

        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const updateData = (trafficData) => {
        setVlanData(prevData => {
            return prevData.map((vlan, index) => {
                const { inputTraffic, outputTraffic } = trafficData[index] || {};
                const currentTime = new Date().toLocaleTimeString();
                const newDataPoint = {
                    inputData: [...vlan.inputData, inputTraffic || 0],
                    outputData: [...vlan.outputData, outputTraffic || 0],
                    timeLabels: [...vlan.timeLabels, currentTime]
                };
                
                const newData = {
                    inputData: newDataPoint.inputData.slice(-300),
                    outputData: newDataPoint.outputData.slice(-300),
                    timeLabels: newDataPoint.timeLabels.slice(-300)
                };
                return newData;
            });
        });
    };

    useEffect(() => {
        vlanData.forEach((vlan, index) => {
            const ctx = chartRefs.current[index].getContext('2d');

            // 销毁之前的图表
            if (chartRefs.current[index].chart) {
                chartRefs.current[index].chart.destroy();
            }

            chartRefs.current[index].chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: vlan.timeLabels,
                    datasets: [
                        {
                            label: 'Input Traffic',
                            data: vlan.inputData,
                            borderColor: 'rgba(75, 192, 192, 0.8)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderWidth: 1
                        },
                        {
                            label: 'Output Traffic',
                            data: vlan.outputData,
                            borderColor: 'rgba(255, 99, 132, 0.8)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
    }, [vlanData]);

    return (
        <div className={styles.container}>
            <PageHead pageName={"Traffic Monitoring"} />
            <Nav path={"./"} />
            <div className={`${styles.rmomMain} ${"pageCenter"} ${styles.rmonMainSet}`}>
                <div className={styles.rmonCharts}>
                    <div className={styles.gridContainer}>
                        {vlanData.map((vlan, index) => (
                            <div key={index} className={styles.chartContainer}>
                                <canvas ref={el => chartRefs.current[index] = el} id={`vlan-chart-${index}`} width="400" height="200"></canvas>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer isHomePage={false} />
            <style jsx>{`
                .pageCenter{
                    justify-content: center;
                }
                .gridContainer {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 20px;
                    width: 100%;
                }
                .chartContainer {
                    width: 100%;
                }
            `}</style>
        </div>
    )
}
