import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
    Container,
    createTheme,
    TableCell,
    LinearProgress,
    ThemeProvider,
    Typography,
    TextField,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Table,
    Paper,
} from "@material-ui/core";
import axios from "axios";
import { ExchangeList } from "../config/api";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContextAPI";
import { numberWithCommas } from "../components/CoinsTable";

export default function ExchangeTable() {
    const [Exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { currency, symbol } = CryptoState();

    const useStyles = makeStyles({
        row: {
            backgroundColor: "#F6FFF8",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#0077b6",
            },
            fontFamily: "Inter",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "#0077b6",
            },
        },
    });

    const classes = useStyles();
    const history = useHistory();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "light",
        },
    });

    const fetchExchange = async () => {
        setLoading(true);
        const { data } = await axios.get(ExchangeList());
        console.log(data);

        setExchanges(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchExchange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const handleSearch = () => {
        return Exchanges.filter(
            (Exchange) =>
                Exchange.name.toLowerCase().includes(search) ||
                Exchange.id.toLowerCase().includes(search)
        );
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant="h4"
                    style={{ margin: 18, fontFamily: "Inter" }}
                >
                </Typography>
                <TextField
                    label="Search For a Crypto Exchange.."
                    variant="outlined"
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer component={Paper}>
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: "#0077b6" }} />
                    ) : (
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: "#0077b6" }}>
                                <TableRow>
                                    {["Exchange", "URL", "Year Established", "Country", "Trust score (CoinGecko)","24h BTC Trade Vol"].map((head) => (
                                        <TableCell
                                            style={{
                                                color: "white",
                                                fontWeight: "700",
                                                fontFamily: "Inter",
                                            }}
                                            key={head}
                                            align={head === "Exchange" ? "" : "left"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {handleSearch()
                                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                    .map((row) => {
                                        return (
                                            <TableRow
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    style={{
                                                        display: "flex",
                                                        gap: 15,
                                                    }}
                                                >
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{ marginBottom: 10 }}
                                                    />
                                                    <div
                                                        style={{ display: "flex", flexDirection: "column" }}
                                                    >
                            <span
                                style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                }}
                            >
                              {row.id}
                            </span>
                                                        <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                                                    </div>
                                                </TableCell>
                                                    <TableCell numeric component="a" href={row.url} align="right">
                                                        {row.url}
                                                    </TableCell>
                                                <TableCell align="right">
                                                    {row.year_established}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.country}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.trust_score}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {numberWithCommas(row.trade_volume_24h_btc.toFixed(0))}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>

                {/* Comes from @material-ui/lab */}
                <Pagination
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    classes={{ ul: classes.pagination }}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </ThemeProvider>
    );
}
