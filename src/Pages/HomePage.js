import React from "react";
import BannerText from "../components/Banner/BannerText";
import CoinsTable from "../components/CoinsTable";
import ExchangeTable from "../components/ExchangeTable";
import IndexTable from "../components/IndexTable";
import DerivativeTable from "../components/DerivativeTable";
import {
    Tabs,
    Tab,
    AppBar, MuiThemeProvider, makeStyles
} from "@material-ui/core";


function TabPanel(props)
{
    const {children, value, index} = props;
        return (<div>
            {
             value===index && (
                 <h1>{children}</h1>
                )
            }
        </div>)
};


const useStyles = makeStyles((theme) => ({
    customLabelColor: {
        color: "white",
        backgroundColor: "#0077b6"
    },
    tabLabelColor: {
        color: "white",
    }
}));


const Homepage = () => {
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const handleChange=(e,value)=>{
        console.warn(value)
        setValue(value)


    };

  return (
        <div>
            <AppBar position={"static"} classes={{
                root: classes.customLabelColor}}>
                <Tabs
                    value={value}
                    onChange={handleChange}

                    TabIndicatorProps={{
                        style: {background: "#f6ae2d", height: "10px", top: "35px",color: "#0077b6",
                            fontFamily: "Inter",
                            fontWeight: "bold", }
                    }}



                >
                >
                    <Tab label="Crypto" color={classes.tabLabelColor}/>
                    <Tab label="Derivative" />
                    <Tab label="Exchange" />
                    <Tab label="Index" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <BannerText />
                <CoinsTable />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DerivativeTable />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ExchangeTable />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <IndexTable />
            </TabPanel>
        </div>
  );
};

export default Homepage;

