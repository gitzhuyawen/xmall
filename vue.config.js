const {defineConfig } = require('@vue/cli-service')
const express = require('express');
const app = express();


const cors = require('cors');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    
    proxy: {
      "/mz": {
        target: 'http://xmall.exrick.cn/',//域名
        ws: false,//是否启用websockets
        changeOrigin: true,
        pathRewrite: {
          "^/mz": "/"
        }
      },
      "/der": {
        target: 'http://localhost:9001/',//域名
        ws: false,//是否启用websockets
        changeOrigin: true,
        pathRewrite: {
          "^/der": "/"
        }
      }
    }
  }
  
})

app.post('http://localhost:8080/api/login',(req,res)=>{
  console.log(req.readableAborted.user);
  //登录获取用户名
  let username=req.body.user
  res.json({
    token:jwt.sign({username:username},'abcd',{
      //过期时间
      expiresIn:"3000s"
    }),
    username,
    state: 1,
    file: '/public/1570600179870.png',
    code: 200,
    address: null,
    balance: null,
    description: null,
    email: null,
    message: null,
    phone: null,
    points: null,
    sex: null,
    id: 62
  })
})

app.post('/api/validate', function (req, res) {
  let token = req.headers.authorization;
  console.log(token);

  // 验证token合法性 对token进行解码
  jwt.verify(token, 'abcd', function (err, decode) {
      if (err) {
          res.json({
              msg: '当前用户未登录'
          })
      } else {
          // 证明用户已经登录
          res.json({
              token: jwt.sign({ username: decode.username }, 'abcd', {
                  // 过期时间
                  expiresIn: "3000s"
              }),
              username: decode.username,
              msg: '已登录',
              address: null,
              balance: null,
              description: null,
              email: null,
              file: "/static/images/1570600179870.png",
              id: 62,
              message: null,
              phone: null,
              points: null,
              sex: null,
              state: 1,
          })
      }
  })
})
