const express = require ('express');
require ('dotenv').config();  
const jwt = require("express-jwt"); // Validate JWT  and set req.user
const jwksRsa = require("jwks-rsa"); //  Retrieve RSA keys from a JSON web key set (JWKS) endpoint
const checkScope = require ('express-jwt-authz'); // Validate JWT scopes

const checkJwt = jwt ({
    // Dynamically provide a singing key based on the kid in the header
    // and the singing keys provided by the JWKS endpoint.

    secret: jwksRsa.expressJwtSecret({
        cache: true, // cache the singing key
        rateLimit: true,
        jwksRequestsPerMinutse: 5, // prevent attackers from requesting more then 5 per Minute
        jwksUri: `https://${
            process.env.REACT_APP_AUTH0_DOMAIN
        }./well-known/jwks.json`
    }),

    // validate the audience and the issuer.
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

    // This must match the algorithm selected  in the AUuth0 dashboard under your app's advanced setting under the Auth0 tab
    algorithms:["RS256"]
});


const app = express ();

app.get("/public", function(red, res){
 res.json ({
     message: "Hello from a public API!"
 
 })
});

app.get("/Private", checkJwt, function(red, res){
    res.json ({
        message: "Hello from a private API!"
    
    })
   });

   function checkRole(role){
       return function (req, res, next) {
        const assignedRoles =req.user["http://localhost:3000/roles"];
        if (Array. isArray(assignedRoles) && assignedRoles.includes (role)) {
            return next();
        } else {
            return res.status(401). send("insuficient role");
        }
   };
}

   app.get("/Course", checkJwt, checkScope(["red:courses"]), function(red, res){
    res.json ({
        courses: [
            {id: 1, tittle: " The Beautiful Once " },
            {id: 2, tittle: " The Brothers " },
        ]
    
    })
   });

   app.get("/admin", checkJwt, checkRole('admin'), function(red, res){
    res.json ({
        message: "Hello from an admin API!"
    
    })
   });
app.listen(3001);
console.log("API server listening on" + process.env.REACT_APP_AUTH0_AUDIENCE);