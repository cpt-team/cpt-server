const funs = {
    isEmptyArr: (arr) => {//�������� ���� (�������� �����ڵ�, �޼���, ��)
        if(Array.isArray(arr) && arr.length === 0)  {
            return true;
          }
          
          return false;
        }
    };
    


module.exports = funs;