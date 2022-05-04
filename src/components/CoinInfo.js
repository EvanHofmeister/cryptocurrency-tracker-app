import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider, Typography,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";

// Historical data hooks


const CoinInfo = ({ coin }) => {
  const [historicData_Price, setHistoricData_Price] = useState();
  const [historicData_MarketCap, setHistoricData_MarketCap] = useState();
  const [historicData_TotalVol, setHistoricData_TotalVol] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [flag,setFlag] = useState(false);

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
    title: {
      flex: 1,
      color: "cadetblue",
      fontFamily: "Inter",
      fontWeight: "bold",
      cursor: "pointer",
    },
  }));

  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true);
    setHistoricData_Price(data.prices);
    setHistoricData_MarketCap(data.market_caps);
    setHistoricData_TotalVol(data.total_volumes);

  };


  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "light",
    },
  });

  return (
    // Time period button
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>

        <div className={classes.container}>
          {!historicData_Price | flag===false ? (
              <CircularProgress
                  style={{ color: "cadetblue" }}
                  size={250}
                  thickness={1}
              />
          ) : (
              <>
                <div
                    style={{
                      display: "flex",
                      marginTop: 0,
                      justifyContent: "space-around",
                      width: "100%",
                      color: "black"
                    }}
                >
                  {chartDays.map((day) => (
                      <SelectButton
                          key={day.value}
                          onClick={() => {setDays(day.value);
                            setFlag(false);
                          }}
                          selected={day.value === days}
                      >
                        {day.label}
                      </SelectButton>
                  ))}
                </div>
              </>
          )}
        </div>


      <div className={classes.container}>
        {!historicData_Price | flag===false ? (
          <CircularProgress
            style={{ color: "cadetblue" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Typography
                variant="h6"
                className={classes.title}
            >
              Price ( Past {days} Days ) in {currency}
            </Typography>
            <Line
              data={{
                labels: historicData_Price.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData_Price.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "cadetgreen",
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                    position: "bottom",
                    boxWidth: 1
                  },
                },
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />

          </>
        )}
      </div>

      <div className={classes.container}>
        {!historicData_MarketCap | flag===false ? (
            <CircularProgress
                style={{ color: "cadetblue" }}
                size={250}
                thickness={1}
            />
        ) : (
            <>
              <Typography
                  variant="h6"
                  className={classes.title}
              >
                Market Cap ( Past {days} Days ) in {currency}
              </Typography>
              <Line
                  data={{
                    labels: historicData_MarketCap.map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                          date.getHours() > 12
                              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                              : `${date.getHours()}:${date.getMinutes()} AM`;
                      return days === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                      {
                        data: historicData_MarketCap.map((coin) => coin[1]),
                        label: `Market Cap ( Past ${days} Days ) in ${currency}`,
                        borderColor: "cadetgreen",
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                        position: "bottom",
                        boxWidth: 1
                      }
                    },
                    elements: {
                      point: {
                        radius: 1,
                      },
                    },
                  }}
              />
            </>
        )}
      </div>

      <div className={classes.container}>
        {!historicData_TotalVol | flag===false ? (
            <CircularProgress
                style={{ color: "cadetblue" }}
                size={250}
                thickness={1}
            />
        ) : (
            <>
              <Typography
                  variant="h6"
                  className={classes.title}
              >
                Total Volume ( Past {days} Days ) in {currency}
              </Typography>
              <Line
                  data={{
                    labels: historicData_TotalVol.map((coin) => {
                      let date = new Date(coin[0]);
                      let time =
                          date.getHours() > 12
                              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                              : `${date.getHours()}:${date.getMinutes()} AM`;
                      return days === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                      {
                        data: historicData_TotalVol.map((coin) => coin[1]),
                        label: `Total Volume ( Past ${days} Days ) in ${currency}`,
                        borderColor: "cadetgreen",
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                        position: "bottom",
                        boxWidth: 1
                      }
                    },
                    elements: {
                      point: {
                        radius: 1,
                      },
                    },
                  }}
              />
            </>
        )}
      </div>
      </div>
    </ThemeProvider>

  );

};

export default CoinInfo;
