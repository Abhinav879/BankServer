
//import library for generate token
const jwt=require('jsonwebtoken') 

//inport model ..... mongoDB server functions
const db=require('./db')



  // userDetails={
  //   1000:{acno:1000,username:"Abhinav",password:1234,balance:1000000,transaction:[]},
  //   1001:{acno:1001,username:"Anju",password:1234,balance:200000,transaction:[]},
  //   1002:{acno:1002,username:"Akhila",password:1234,balance:300000,transaction:[]},
  //   1003:{acno:1003,username:"Arjun",password:1234,balance:400000,transaction:[]},
  // }

const register=(acno,username,password)=>{

  return db.User.findOne({acno}).then(user=>{
    if(user){
      return {
        statuscode:401,
        status:false,
        Message:"user already exist"
      }                  //return(true/false)  
    }
    else{
      //insert data into db
      const newuser=new db.User({acno,username,balance:0,password,transaction:[]})
      //to store the object in collection
      newuser.save()
      return {
        statuscode:201,
        status:true,
        Message:'registration success'
      }
    }
  })
}


    // if(acno in userDetails){
    //   // return {
    //   //   statuscode:401,
    //   //   status:false,
    //   //   Message:"user already exist"
    //   // }                  //return(true/false)  
    // }
    // else{
    //   userDetails[acno]={acno,username,password,balance:0,transaction:[]}
    //   console.log(userDetails);


    //   return {
    //     statuscode:201,
    //     status:true,
    //     message:'registration success'
    //   }
    // }
  
  
  const login=(acnum,pswd)=>{
      return db.User.findOne({acno:acnum,password:pswd}).then(user=>{
        if(user){
          currentUser=user.username
          currentAcno=acnum
          const token=jwt.sign({currentAcno:acnum},'key123')
          return {
            statuscode:200,
            status:true,
            Message:"login success",
            currentUser,
            currentAcno,
            token
          }
        }  
        else{
        return {
            statuscode:401,
            status:false,
            Message:"incorrect username or password"
         }
       }
      })
   }
  

    // let router=this.router
    // if(acnum in userDetails){
    //   if(pswd==userDetails[acnum]["password"]){
    //     currentUser=userDetails[acnum]['username']
    //     currentAcno=acnum

        // const token=jwt.sign({currentAcno:acnum},'key123')
                                              //string without space

        // return{
        //   statuscode:200,
        //   status:true,
        //   Message:"login success",
        //   currentUser,
        //   currentAcno,
        //   token
  
        // }
        // alert("login successfully")
        //redirection
        // router.navigateByUrl('dashboard')
      // }
      // else{
      //   return{
      //     statuscode:401,
      //     status:false,
      //     Message:"incorrect password"
  
      //   }
      // }
    // }
    // else{
    //   return{
    //     statuscode:401,
    //     status:false,
    //     Message:"not a registered user"

    //   }
    // }
  // }

  const deposit=(acnum,pswrd,amnt)=>{
    var amount=parseInt(amnt)            // string amount converted to integer use parseInt()
    return db.User.findOne({acno:acnum,password:pswrd}).then(user=>{
      if(user){
        user.balance +=amount
        user.transaction.push({type:'credit',amount})
        user.save()  // to save the updations in db

        return{
          statuscode:200,
          status:true,
          Message:`${amount} credited and new balance is ${user.balance}`
        }
      }
      else{
        return{
          statuscode:401,
          status:false,
          Message:" incurrect ac number or password"
        }
      }
    })
  }
    // if(acnum in userDetails){
    //   if(pswrd==userDetails[acnum]['password']){
    //     userDetails[acnum]['balance']+=amount
    //     userDetails[acnum]['transaction'].push({type:'credit',amount})

    //     return{
    //       statuscode:200,
    //       status:true,
    //       Message:`${amount} credited and new balance is ${userDetails[acnum]['balance']}`
    //     }
      // }
  //     else{
  //       return{
  //         statuscode:401,
  //         status:false,
  //         Message:" incurrect password"
  //       }
  //   }
  // }
  //   else{
  //     return{
  //       statuscode:401,
  //       status:false,
  //       Message:" user not exist"

  //     }
  //   }
  // }

  const withdraw=(acnum1,pswrd1,amnt1)=>{
    var amount=parseInt(amnt1)            // string amount converted to integer use parseInt()
    return db.User.findOne({acno:acnum1,password:pswrd1}).then(user=>{
      if(user){
        if(user.balance>amount){
        user.balance -= amount
        user.transaction.push({type:'debit',amount})
        user.save()  // to save the updations in db

        return{
          statuscode:200,
          status:true,
          Message:`${amount} debited and new balance is ${user.balance}`
        }
      }
      else{
        return{
          statuscode:401,
          status:false,
          Message:" Insufficient balance"
        }
      }
    }
    else{
      return{
        statuscode:401,
        status:false,
        Message:"incurrect ac number or password"
      }
    }
    })
  }



  //   if(acnum1 in userDetails){
  //     if(pswrd1==userDetails[acnum1]['password']){
  //       if(userDetails[acnum1]['balance']>=amnt1){
  //       userDetails[acnum1]['balance']-=amount
  //       userDetails[acnum1]['transaction'].push({type:'debit',amount})
  //       return {
  //         statuscode:200,
  //         status:true,
  //         Message:`${amount} debited and new balance is ${userDetails[acnum1]['balance']}`

  //       }
  //     }
  //     else{
  //       return{
  //         statuscode:401,
  //         status:false,
  //         Message:"insufficient balance"
  //       }
  //     }
  //   }
  //     else{
  //       return{
  //         statuscode:401,
  //         status:false,
  //         Message:"incurrect password"
  //       }
  //     }
  //   }
  //   else{
  //     return{
  //       statuscode:401,
  //       status:false,
  //       Message:"user not exist"
  //     }
  //   }
  // }

  const getTransaction=(acno)=>{
    return db.User.findOne({acno}).then(user=>{
      if(user){
        return{
          statuscode:200,
          status:true,
          transaction:user['transaction']
        }    
      }
      else{
        return{
          statuscode:401,
          status:false,
          Message:"user doesnt exist!"
        }
      }  
    })
  }

  const deleteAcc=(acno)=>{
    return db.User.deleteOne({acno}).then(user=>{
      if(user){
        return{
          statuscode:200,
          status:true,
          Message:"Deleted Successfully"
        }
      }
      else{
        return{
          statuscode:401,
          status:false,
          Message:"user doesnt exist!"
        }
      }
    })
  }

  module.exports={
    register,login,deposit,withdraw,getTransaction,deleteAcc
  }
