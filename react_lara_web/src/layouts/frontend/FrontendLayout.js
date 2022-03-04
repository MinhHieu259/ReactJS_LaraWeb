import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Navbar from '../../layouts/frontend/Navbar';
import publicRoutesList from '../../routes/Publicroutelist';




const FrontendLayout = () => {
    return(
        <div>
            <Navbar/>
            
                <div>
                    <main>
                        <Switch>
                            {publicRoutesList.map((routedata, idx)=>{
                                return(
                                    routedata.component && (
                                        <Route
                                            key={idx}
                                            path={routedata.path}
                                            exact={routedata.exact}
                                            name={routedata.name}
                                            render={(props) => (
                                                <routedata.component{...props}/>
                                            )}
                                        />
                                    )
                                )
                            })}
                       
                        </Switch>
                    </main>
                    
                </div>
        </div>
    );
}
export default FrontendLayout;