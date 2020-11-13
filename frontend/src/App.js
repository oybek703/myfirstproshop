import React, {Fragment} from 'react';
import './index.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

const App = () => {
    return (
        <Router>
            <Header/>
            <Container>
                <main>
                    <Route path='/' exact component={HomeScreen} />
                    <Route path='/product/:id'  component={ProductScreen} />
                </main>
            </Container>
            <Footer/>
        </Router>
    );
};

export default App;