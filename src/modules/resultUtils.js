const authUtil = {
    successTrue: (status, message, data) => {//�������� ���� (�������� �����ڵ�, �޼���, ��)
        return {
            status: status,
            success: true,
            message: message,
            data: data
        }
    },
    successFalse: (status, message) => {//���� ���� ����

        return {
            status: status,
            success: false,
            message: message
        }
    },
};

module.exports = authUtil;