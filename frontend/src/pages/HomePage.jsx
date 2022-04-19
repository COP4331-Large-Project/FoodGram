import React from 'react';
import LoggedInName from '../components/LoggedInName';
import TopNavbar from "../components/Nav/TopNavbar_dashboard";
const HomePage = () =>
{
    return(
        <div>
            <TopNavbar/>
            <LoggedInName />
        </div>
    );
}
export default HomePage;