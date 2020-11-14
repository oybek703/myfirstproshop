import React from 'react';
import './index.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import './bootstrap.min.css'
import {Container} from "react-bootstrap";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import {Provider} from "react-redux";
import store from "./redux/store";
import CartScreen from "./screens/CartScreen";
const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Header/>
                <Container>
                    <main>
                        <Route path='/' exact component={HomeScreen} />
                        <Route path='/product/:id'  component={ProductScreen} />
                        <Route path='/cart/:id?'  component={CartScreen} />
                    </main>
                </Container>
                <Footer/>
            </Router>
        </Provider>
    );
};

export default App;