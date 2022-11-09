//server creation 

const express = require('express')
const req = require('express/lib/request')

const jwt=require('jsonwebtoken') 

const cors=require('cors')

// Import Express and store in a const variable
    require('express')


// 2. app creation using express
      const app=express()
      
// give command to share 
      app.use(cors({origin:'http://localhost:4200'}))    


    // to parse json datas from req body
    app.use(express.json())  


// 3.create port number   3000 series code using for server runing
      app.listen(3000,()=>{console.log('server started at port nuber 3000')})

   // import dataserive file form service folder use register function
      const dataService=require('./service/dataservice')   

//login
//register - post request
    app.post('/register',(req,res)=>{
        console.log(req.body);
                                                  //its a response of asynchronous request so e=we cant store the 
                                                //output in a variable so we use then to access and store the output
       result=dataService.register(req.body.acno,req.body.username,req.body.password).then(result=>{
        res.status(result.statuscode).json(result)
       })
        // res.status(result.statuscode).json(result)
    })

    //middleware creation - to check token is valid - verify()
    const jwtmiddleware=(req,res,next)=>{
        try{
            console.log('router specific middleware started-----');
            //token from client
            token=req.headers['token1']   //stored client token in a variable
            //validation token
            const data=jwt.verify(token,'key123')
            console.log(data);
    
            //to take next request after the working of middleware 
            next()
    
        }
        catch{
            res.status(422).json({
                statuscode:422,
                status:false,
                message:'please login'
            })
        }

    }

    //login
    app.post('/login',(req,res)=>{
        console.log(req.body);
        dataService.login(req.body.acnum,req.body.pswd).then(result=>{
                res.status(result.statuscode).json(result)
       })
    })

    //deposit
    app.post('/deposit',jwtmiddleware,(req,res)=>{
            console.log(req.body);
              dataService.deposit(req.body.acnum,req.body.pswrd,req.body.amnt).then(result=>{
                res.status(result.statuscode).json(result)
            })
    })

    //withdraw
    app.post('/withdraw',jwtmiddleware,(req,res)=>{
        console.log(req.body);
        dataService.withdraw(req.body.acnum1,req.body.pswrd1,req.body.amnt1).then(result=>{
            res.status(result.statuscode).json(result)
        })
    })

     //transaction   
    app.post('/transaction',jwtmiddleware,(req,res)=>{
        console.log(req.body);
        dataService.getTransaction(req.body.acno).then(result=>{
        res.status(result.statuscode).json(result)
       })
    })

    //delete
    app.delete('/deleteacc/:acno',(req,res)=>{
        dataService.deleteAcc(req.params.acno).then(result=>{
            res.status(result.statuscode).json(result)  
        })
    })

    



//deposit
//withdraw
//transaction history
//delete 
      

  // resolve http request 
  //get request
    //   app.get('/',(req,res)=>{res.send('Get method')})   


    // //post request
    // app.post('/',(req,res)=>{res.send('post method')})   


    //   //patch request
    //   app.patch('/',(req,res)=>{res.send('patch method')})   

