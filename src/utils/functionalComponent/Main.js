import React from "react";
import Dashboard from "../../components/Dashboard";
import Landing from "../../components/Landing"
import { useAuth } from '../useAuth';

function Main() {
    const firebase = useAuth();

    return (
        <main className="content">
            {firebase.user ?
                <Dashboard />
                :
                <Landing />
            }
        </main>
    );
}

export default Main;

