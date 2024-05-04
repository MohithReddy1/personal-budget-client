import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

// ... (imports)

function Visualizations() {
  const [chartData, setChartData] = useState({
    datasets: [
      {
        budget: [],
        expense: [],
        backgroundColor: [],
      },
    ],
    labels1: [],
    labels2: [],
  });

  const [dataExists, setDataExists] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthlyBudget, setMonthlyBudget] = useState([
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]);

  function getRandomColor(previousColors) {
    let color = '#';
    const hexLength = 6;
    const letters = '0123456789ABCDEF';

    while (color.length < hexLength + 1 || previousColors.includes(color)) {
      for (let i = 0; i < hexLength; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
    }
    return color;
  }

  const createPieChart = (chartRef, data, labels) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          datasets: [
            {
              data: data,
              backgroundColor: chartData.datasets[0].backgroundColor,
            },
          ],
          labels: labels,
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };

  const createDoughnutChartExpenses = (chartRef, data, labels) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: data,
              backgroundColor: chartData.datasets[0].backgroundColor,
            },
          ],
          labels: labels,
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };

  const createGroupedBarChart = (chartRef, labels, budget, expenses) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Budget',
              data: budget,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
            {
              label: 'Expense',
              data: expenses,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              stacked: false,
            },
            y: {
              stacked: false,
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };

  const createLineChart = (chartRef, labels, budget, expenses) => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Budget',
              data: budget,
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 2,
              fill: false,
            },
            {
              label: 'Expense',
              data: expenses,
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              stacked: false,
            },
            y: {
              stacked: false,
            },
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  };

  const budgetPieChartRef = useRef(null);
  const expensesDoughnutChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => createPieChart(budgetPieChartRef, chartData.datasets[0].budget, chartData.labels1), [chartData]);
  useEffect(() => createDoughnutChartExpenses(expensesDoughnutChartRef, chartData.datasets[0].expense, chartData.labels2), [chartData]);
  useEffect(() => createGroupedBarChart(barChartRef, chartData.labels1, chartData.datasets[0].budget, chartData.datasets[0].expense), [chartData]);
  useEffect(() => createLineChart(lineChartRef, chartData.labels1, chartData.datasets[0].budget, chartData.datasets[0].expense), [chartData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');
        const endpoint = `http://68.183.138.206:4000/get-expenses/${userData}?month=${selectedMonth}`;
        const res = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data && res.data.length > 0) {
          const updatedExpenses = { ...chartData };
          res.data.forEach((item, i) => {
            updatedExpenses.datasets[0].expense[i] = item.expense;
            updatedExpenses.datasets[0].backgroundColor[i] = getRandomColor(chartData.datasets[0].backgroundColor);
            updatedExpenses.labels2[i] = item.category;
          });
          setChartData(updatedExpenses);
          setDataExists(true);
          setDataLoaded(true);
        } else {
          setDataExists(false);
          setDataLoaded(true);
        }
      } catch (error) {
        console.error('Error while fetching expenses data:', error.message);
        setDataLoaded(true);
      }
    };

    if (selectedMonth) {
      fetchData();
    }
  }, [selectedMonth]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('userData');
        const endpoint = `http://68.183.138.206:4000/get-budgets/${userData}?month=${selectedMonth}`;
        const res = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data && res.data.length > 0) {
          const updatedData = { ...chartData };
          res.data.forEach((item, i) => {
            updatedData.datasets[0].budget[i] = item.budget;
            updatedData.datasets[0].backgroundColor[i] = getRandomColor(chartData.datasets[0].backgroundColor);
            updatedData.labels1[i] = item.category;
          });
          setChartData(updatedData);
          setDataExists(true);
          setDataLoaded(true);
        } else {
          setDataExists(false);
          setDataLoaded(true);
        }
      } catch (error) {
        console.error('Error while fetching budget data:', error.message);
        setDataLoaded(true);
      }
    };

    if (selectedMonth) {
      fetchData();
    }
  }, [selectedMonth]);

  return (
    <main className="center" id="main" aria-label="main">
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <br></br>
        <label htmlFor="monthlyBudget" style={{ marginRight: '10px', fontSize: '20px' }}>
          Choose the month for which you want your expenses to be displayed:
        </label>
        <select
          id="monthlyBudget"
          onChange={(e) => setSelectedMonth(e.target.value)}
          value={selectedMonth}
          style={{
            padding: '8px',
            boxSizing: 'border-box',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '200px',
          }}
        >
          <option value="">Select Month</option>
          {monthlyBudget.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {dataLoaded ? (
        dataExists ? (
          <section>

            <section className="chart-container">
              <article className="chart">
                <h1>Pie Chart - Budget</h1>
                <p>
                  <canvas ref={budgetPieChartRef} />
                </p>
              </article>
              <article className="chart">
                <h1>Doughnut Chart - Expenses</h1>
                <p>
                  <canvas ref={expensesDoughnutChartRef} />
                </p>
              </article>
            </section>
            <h1>Comparison of Budget vs Expenses</h1>
            <section className="chart-container">
              <article className="chart">
                <h1>Bar Chart</h1>
                <p>
                  <canvas ref={barChartRef} />
                </p>
              </article>
            </section>

            <section className="chart-container">
              <article className="chart">
                <h1>Line Chart</h1>
                <p>
                  <canvas ref={lineChartRef} />
                </p>
              </article>
            </section>
          </section>
        ) : (
          <div>
            <p>Please enter some data to get charts.</p>
          </div>
        )
      ) : (
        <></>
      )}
    </main>
  );
}

export default Visualizations;
