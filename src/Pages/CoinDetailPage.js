import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinCharts from "../components/CoinCharts";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContextAPI";

const CoinDetailPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
        color: "white"
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        color: "white"
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
      color: "black",
      flexWrap: 'wrap'
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Inter",
      color: "black",
    },
    description: {
      width: "100%",
      fontFamily: "Inter",
      color: "black",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      color: "black",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "#0077b6" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="100"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser([0,1,2,3,4].map(x => coin?.description.en.split(". ")[x]))}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Inter",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Inter",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Inter",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -9)
              )}
              B
            </Typography>
          </span>



          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Total Volume:
            </Typography>
            &nbsp; &nbsp;
            <Typography
                variant="h5"
                style={{
                  fontFamily: "Inter",
                }}
            >
              {symbol}{" "}
              {numberWithCommas(
                  coin?.market_data.total_volume[currency.toLowerCase()]
                      .toString()
                      .slice(0, -9)
              )}
              B
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Circulating Supply:
            </Typography>
            &nbsp; &nbsp;
            <Typography
                variant="h5"
                style={{
                  fontFamily: "Inter",
                }}
            >
              {numberWithCommas(
                  coin?.market_data.circulating_supply
                .toString()
                .slice(0, -9)
              )}
              B
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Total Supply:
            </Typography>
            &nbsp; &nbsp;

            <Typography
                variant="h5"
                style={{
                  fontFamily: "Inter",
                }}
            >
              {numberWithCommas(
                  coin?.market_data?.total_supply
                      ?.toString()
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              ATH:
            </Typography>
            &nbsp; &nbsp;
            <Typography
                variant="h5"
                style={{
                  fontFamily: "Inter",
                }}
            >
              {symbol}{" "}
              {numberWithCommas(
                  coin?.market_data.ath[currency.toLowerCase()]
                      .toString()
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              ATH % Change:
            </Typography>
            &nbsp; &nbsp;
            <Typography
                variant="h5"
                style={{
                  fontFamily: "Inter",
                }}
            >
              {numberWithCommas(
                  coin?.market_data.ath_change_percentage[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
              )}
              %
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              ATL:
            </Typography>
            &nbsp; &nbsp;
            <Typography
                variant="h5"
                style={{
                  fontFamily: "Inter",
                }}
            >
              {symbol}{" "}
              {numberWithCommas(
                  coin?.market_data.atl[currency.toLowerCase()]
                      .toString()
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              ATL % Change:
            </Typography>
            &nbsp; &nbsp;
            <Typography
                variant="h5"
                style={{
                  fontFamily: "Inter",
                }}
            >
              {numberWithCommas(
                  coin?.market_data.atl_change_percentage[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
              )}
              %
            </Typography>
          </span>


        </div>
      </div>
      <CoinCharts coin={coin} />
    </div>
  );
};

export default CoinDetailPage;
