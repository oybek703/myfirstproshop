import React from 'react';
import {Helmet} from "react-helmet";

const Meta = ({title = 'Welcome to Proshop | Home',
                  keywords = 'electronics, buy electronics, best products'},
              description = 'We but best products for cheap'
                  ) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keywords' content={keywords}/>
        </Helmet>
    );
};

export default Meta;