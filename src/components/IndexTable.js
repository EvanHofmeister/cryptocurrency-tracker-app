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
import { IndexList } from "../config/api";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas, nullInputReturn } from "../components/CoinsTable";

export default function IndexTable() {
    const [Indexes, setIndexes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { currency, symbol } = CryptoState();

    const useStyles = makeStyles({
        row: {
            backgroundColor: "white",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "cadetblue",
            },
            fontFamily: "Inter",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "cadetblue",
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

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(IndexList());
        console.log(data);

        setIndexes(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const handleSearch = () => {
        return Indexes.filter(
            (Index) =>
                Index.name.toLowerCase().includes(search) ||
                Index.id.toLowerCase().includes(search)
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
                    label="Search For a Crypto Index.."
                    variant="outlined"
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer component={Paper}>
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: "cadetblue" }} />
                    ) : (
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: "cadetblue" }}>
                                <TableRow>
                                    {["Name", "ID", "Market", "Last", "Multi Asset Composite"].map((head) => (
                                        <TableCell
                                            style={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Inter",
                                            }}
                                            key={head}
                                            align={head === "Index" ? "" : "left"}
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
                                                <TableCell align="right">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {row.market}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        row?.last?.toFixed(2)
                                                    )}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {nullInputReturn(row.is_multi_asset_composite)}
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
