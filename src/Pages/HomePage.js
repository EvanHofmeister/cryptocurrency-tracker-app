import React from "react";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";
import ExchangeTable from "../components/ExchangeTable";
import IndexTable from "../components/IndexTable";
import DerivativeTable from "../components/DerivativeTable";
import {
    Tabs,
    Tab,
    AppBar,
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

const Homepage = () => {
    const [value, setValue] = React.useState(0);

    const handleChange=(e,value)=>{
        console.warn(value)
        setValue(value)
    };

  return (
        <div>
            <AppBar position={"static"}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab label="Crypto" />
                    <Tab label="Derivative" />
                    <Tab label="Exchange" />
                    <Tab label="Index" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Banner />
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

