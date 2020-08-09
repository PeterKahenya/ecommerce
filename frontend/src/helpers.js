const axios = require("axios")

async function login(credentials) {
    console.log(credentials)
    var response = await axios({
        method:"POST",
        url:"http://127.0.0.1:8000/api/shop/login",
        data:{
            "email":credentials.email,
            "password":credentials.password,
            "gcm_token":credentials.gcm_token
        }
    })

    console.log(response)

    if (response.status===200&&response.data.success) {
        document.cookie = "auth_token="+response.data.token+";domain;path=/"
        document.cookie = "user="+JSON.stringify(response.data.user)+";domain;path=/"
        
        return true
    } else {
        return false
    }
}

async function signup(credentials) {
    var utype=credentials.tab===0?"customers":"experts"
    var response = await axios({
        method:"POST",
        url:"http://127.0.0.1:8000/api/"+utype+"/signup",
        data:credentials
    })

    console.log(response)

    if (response.status===201&&response.data.success) {
        document.cookie = "auth_token="+response.data.token+";domain;path=/"
        document.cookie = "user="+JSON.stringify(response.data.user)+";domain;path=/"
        
        return true
    } else {
        return false
    }
}


function getCookie(name) {
    var cookieArray = document.cookie.split(";");

    for (let index = 0; index < cookieArray.length; index++) {
        const cookiePair = cookieArray[index].split("=");
        if (name===cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}



module.exports={getCookie,login,signup}