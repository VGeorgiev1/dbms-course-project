const utils = {
    executeQuery: function(query, connection){
        connection.query(query,(err, result)=>{
            if(err) throw err;
            console.log(result);
        })
    },
    register:   (req,res, connection) =>{
                    
                    utils.executeQuery(`CREATE TABLE IF NOT EXISTS users(
                                        username VARCHAR(30)
                                        ,email VARCHAR(30),
                                        password VARCHAR(30))`, connection)                   
                    utils.executeQuery( `INSERT INTO users VALUES (
                                        "${req.body.username}",
                                        "${req.body.Email}",
                                        "${req.body.password}")`, connection);
                    res.send('Registered!');
    }
}
module.exports = {
    utils,
    executeQuery
}