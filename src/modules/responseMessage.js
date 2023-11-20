"use strict"

module.exports = {
    NULL_VALUE: "필요한 값이 없습니다",
    OUT_OF_VALUE: "파라미터 값이 잘못되었습니다",
    // db

    DB_ERROR:"db error",

    // user sign in
    NO_USER: "존재하지 않는 회원입니다.",
    MISS_MATCH_PW: "비밀번호가 맞지 않습니다.",
    LOGIN_SUCCESS: "로그인 성공",
    ID_OR_PW_NULL_VALUE: "아이디/비밀번호 값이 없습니다.",

    // user sign out
    LOGOUT_SUCCESS: "로그아웃 성공",
    LOGOUT_FAIL: "로그아웃 실패",

    // user signup
    USER_INSERT_FAIL: 'user insert fail',
    SIGNUP_SUCCESS: '회원 가입 성공',
    SIGNUP_FAIL: '중복된 email이 존재합니다.',
    ALREADY_USER: "이미 회원입니다.",

    // user create/delete
    USER_DELETE_FAIL:'user 계정 삭제 실패',
    USER_DELETE_SUCCESS:'user 계정 삭제 성공!',

    // token
    REFRESH_UPDATE_ERROR: 'refreshtoken DB등록 오류',
    NOT_CORRECT_REFRESH_TOKEN: 'refreshtoken이 만료되었습니다.',
    REFRESH_UPDATE_ERROR:'refresh update fail',
    EMPTY_TOKEN:'토큰이 없습니다.',
    EXPRIED_TOKEN:'만료된 토큰입니다.',
    INVALID_TOKEN:'잘못된 형식의 토큰입니다.',
    REFRESH_TOKEN:'토큰 발급 완료!',
   
    
    // plant
    GARDEN_SELECT_FAIL:"garden select fail",
    GARDEN_SUCCESS:"garden get 성공",
    GARDEN_FAIL:"garden get 실패",
    PLANT_SUCCESS:"plant 성공",
    PLANT_FAIL:"plant 실패",
    ALREADY_PLANT:"이미 심으셨습니다!",
    WRITE_DIARY:"일기를 써야 심을 수 있어요!",

    ///////////////
    NO_PLANT: "식물이 없음",
    FIND_PLANT: "식물 찾음",
    PLANT_SAVE_SUCCESS: "식물 저장 성공",
    PLANT_CAN_SAVE: "키우고 있는 식물 없음. 선택 가능",
    PLANT_SAVE_FAIL: "식물 저장 실패 이미 들어가 있는 식물",
    /////////////////

    BALLOON_SELECT_FAIL:"balloon select fail",
    TREENUM_FAIL:"treeNum 가져오기 fail",
    GROSS_INSERT_SUCCESS:"잡초 심기 성공",
    GROSS_INSERT_FAIL:"잡초 심기 실패",

    /*
    // user diary
    NEW_USER_FAIL:"새로운 유저 일기 등록 실패",
    NEW_USER_SUCCESS:"새로운 유저 일기 등록 성공",
    EXIST_USER_FAIL:"기존 유저 일기 등록 실패",
    EXIST_USER_SUCCESS:"기존 유저 일기 등록 성공",

    */

    // Emotion
    EMOTION_NOT_EXIST:"이모티콘이 존재하지 않는 값입니다.",


    // Whether
    WHETHER_NOT_EXIST:"날씨가 존재하지 않는 값입니다.",

    // diary data
    
    ALREADY_WRITE:"이미 일기를 등록 하셨습니다!",
    UPDATE_DIARY_FAIL:"diary update fail",
   
    DIARY_SAVE_SUCCESS:"diary 등록 성공!",
    DIARY_SAVE_FAIL:"diary 등록 실패",
    DIARY_UPDATE_SUCCESS:"diary 수정 성공!",
    DIARY_CREATE_FAIL:"diary 등록 실패",

    // diary get
    DIARY_OBJECTID_IS_NOT_EQUAL: "ObjectId 값이 아닙니다.",
    DIARY_GET_FAIL:"diary get fail",
    DIARY_GET_SUCCESS:"diary get success",
    DIARY_SELECT_SUCCESS: "일기 조회 성공",
    DIARY_SELECT_FAIL: "일기 조회 실패",
    DIARY_ALREADY_EXIST: "해당 날짜에 다이어리가 이미 존재합니다",
    

    // diary delete
    DIARY_DELETE_SUCCESS: "일기 삭제 성공",
    DIARY_DELETE_FAIL: "일기 삭제 실패",


    // odos data
   
    ODOS_SAVE_SUCCESS:"odos 등록 성공!",
    ODOS_SAVE_FAIL:"odos 등록 실패",
    ODOS_CREATE_FAIL:"odos 등록 실패",

    // odos get
    ODOS_OBJECTID_IS_NOT_EQUAL: "ObjectId 값이 아닙니다.",
    ODOS_GET_FAIL:"odos get fail",
    ODOS_GET_SUCCESS:"odos get success",
    ODOS_SELECT_SUCCESS: "odos 조회 성공",
    ODOS_SELECT_FAIL: "odos 조회 실패",
    ODOS_ALREADY_EXIST: "해당 날짜에 odos가 이미 존재합니다",
    

    // 미정
    SEND_EMAIL_FAIL: "메일 전송 실패",
    SEND_EMAIL_SUCCESS:"메일 전송 성공",
    UNDEFINED_EMAIL: "저장된 이메일이 아닙니다.",
    UPDATE_PW_FAIL:'update password fail',
};