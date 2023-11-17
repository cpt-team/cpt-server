const funs = {
    isEmptyArr: (arr) => {//성공했을 때에 (서버상의 상태코드, 메세지, 값)
        if(Array.isArray(arr) && arr.length === 0)  {
            return true;
          }
          
          return false;
        }
    };
    


module.exports = funs;