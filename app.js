const jwt = require('jsonwebtoken');
const fs = require('fs');
// var token = '';
fs.stat('./cert/cert.sign',function(err,stats){
  if (stats) {
    fs.readFile('./cert/cert.sign','utf8',function(err,data){
      if(data==''){
        fs.writeFileSync('./cert/cert.sign',refreshToken());
        console.log('Cerification Info Created!');
      }
      else {
        jwt.verify(data, 'dongwha', function(err,result){
          var cu = Math.floor(Date.now()/1000);
          console.log(result);
          // if ()
          if(err){ // 토큰 만료시간 경과시..
            console.log('token is expired!!!');
            fs.writeFileSync('./cert/cert.sign',refreshToken());
            console.log('token is updated!!');
          }
          else{
              console.log(cu,result.iat-cu);
              if ((cu-result.iat) > 30 ){ //세션 유지시간 경과시.. 단위 초
                fs.writeFileSync('./cert/cert.sign',refreshToken());
                console.log('session time out..');
                console.log('tokeon updated..');
              }
            console.log(result.exp+' token is cerificated!!!');
          }
        });
      }
    });
    // fs.close();
  }
});
function refreshToken(){
  return jwt.sign({data:'d4001367', session_check : Math.floor(Date.now()/1000)},'dongwha',{ expiresIn: 60 }); //만료 1분 짜리 토큰 발급
}
