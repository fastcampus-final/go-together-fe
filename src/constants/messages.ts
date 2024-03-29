export const MESSAGES = {
  INVALID_AUTH: '회원 전용 메뉴입니다.\n로그인 후 이용해 주세요.',
  VALID_AUTH: '이미 로그인된 계정입니다.',
  ERROR: '에러가 발생하였습니다.',
  LOGIN: {
    CHECK: '존재하지 않는 이메일이거나\n비밀번호가 일치하지 않습니다.',
    ERROR_LOGIN: '로그인 중\n에러가 발생하였습니다.',
    COMPLETE_LOGIN: '로그인이 완료되었습니다.',
    ADMIN_LOGIN: '관리자 계정으로\n로그인 되었습니다.',
    WITHDRAWAL: '탈퇴한 회원입니다.',
  },
  LOGOUT: {
    ERROR_LOGOUT: '로그아웃 중\n에러가 발생하였습니다.',
    COMPLETE_LOGOUT: '로그아웃이 완료되었습니다.',
  },
  SIGNUP: {
    CHECK_EMAIL_DUPLICATE: '이미 존재하는 이메일입니다.',
    INPUT_ERROR: '입력 항목을 확인해주세요.',
    USED_EMAIL: '사용 불가능한 이메일입니다.',
    UNUSED_EMAIL: '사용 가능한 이메일입니다.',
    SUBMIT_CHECK: '회원가입을 완료하시겠습니까?',
    ERROR_SIGNUP: '회원 가입 중\n에러가 발생하였습니다.',
    COMPLETE_SIGNUP: '회원 가입이\n완료되었습니다.',
    WITHDRAWAL: '이미 탈퇴한 회원입니다.',
    MISS: '비밀번호 또는 이메일이 올바르지 않습니다.',
    CONFIRM_PASSWORD: '비밀번호가 일치하지 않습니다.',
  },
  INPUT: {
    CHECK: {
      PASSWORD: '비밀번호는 필수 입력입니다.',
      EMAIL: '이메일은 필수 입력입니다.',
      PHONE: '전화번호는 필수 입력입니다.',
      NAME: '이름은 필수 입력입니다.',
      CONFIRM_PASSWORD: '비밀번호 확인은 필수입니다.',
      BIRTH: '생년월일은 필수 입력입니다.',
      SEX: '성별은 필수 입력입니다.',
      AGREE: '약관동의는 필수입니다.',
      PASSPORT: '여권 이름은 필수 입력입니다.',
    },
    ERROR: {
      PASSWORD_MIN: '8자리 이상 비밀번호를 사용하세요.',
      PASSWORD_MAX: '16자리 이하 비밀번호를 사용하세요.',
      PASSWORD_PATTERN: '적합한 비밀번호가 아닙니다.',
      PHONE_PATTERN: '전화번호 형식에 맞지 않습니다.',
      PHONE_MAX: '전화번호는 11자리 이하입니다.',
      NAME_PATTERN: '이름 형식에 맞지 않습니다.',
      NAME_MAX: '이름은 3자리 이상 4자리 이하입니다.',
      EMAIL_PATTERN: '이메일 형식에 맞지 않습니다.',
      BIRTH_PATTERN: '생년월일 형식에 맞지 않습니다.',
    },
  },
  PRODUCT: {
    CHECK_KEYWORD: '검색어를 입력해 주세요.',
    ERROR_GET_PRODUCT: '상품 목록 조회 중\n에러가 발생하였습니다.',
    ERROR_GET_RECOMMEND: '추천 검색어 조회 중\n에러가 발생하였습니다.',
    ERROR_ADD_PRODUCT: '상품 등록 중\n에러가 발생하였습니다.',
    ERROR_EDIT_PRODUCT: '상품 수정 중\n에러가 발생하였습니다.',
    ERROR_DELETE_PRODUCT: '상품 숨김 처리 중\n에러가 발생하였습니다.',
    COMPLETE_ADD_PRODUCT: '상품이 등록되었습니다.',
    COMPLETE_EDIT_PRODUCT: '상품이 수정되었습니다.',
    COMPLETE_DELETE_PRODUCT: '상품이 숨김 처리되었습니다.',
    ERROR_ADD_OPTION: '옵션 등록 중\n에러가 발생하였습니다.',
    ERROR_EDIT_OPTION: '옵션 수정 중\n에러가 발생하였습니다.',
    ERROR_DELETE_OPTION: '옵션 삭제 중\n에러가 발생하였습니다.',
    COMPLETE_ADD_OPTION: '옵션이 등록되었습니다.',
    COMPLETE_EDIT_OPTION: '옵션이 수정되었습니다.',
    COMPLETE_DELETE_OPTION: '옵션이 삭제되었습니다.',
  },
  PRODUCT_DETAIL: {
    ERROR_GET_DETAIL: '상품 상세 조회 중\n에러가 발생하였습니다.',
    ADD_CART: '장바구니에 추가되었습니다.\n장바구니로 이동하시겠습니까?',
    OPTION_ERROR: '필수 옵션을 선택해 주세요.',
  },
  CART: {
    ERROR_GET_CART: '장바구니 목록 조회 중\n에러가 발생하였습니다.',
    CHECK_PEOPLE: '최소 인원은 1인 입니다.',
    COMPLETE_EDIT: '저장이 완료되었습니다.',
    ERROR_EDIT: '장바구니 저장 중\n에러가 발생하였습니다.',
    ERROR_NOT_CHECK: '선택하신 상품이 없습니다.',
    COMPLETE_DELETE: '삭제가 완료되었습니다.',
    ERROR_DELETE: '장바구니 삭제 중\n에러가 발생하였습니다.',
  },
  ORDER: {
    EXPIRE: '결제 시간이 초과되었습니다.\n다시 시도해주세요.',
  },
  SURVEY: {
    CHECK_ANSWER: '답변을 선택해 주세요.',
    ERROR_GET_PRODUCT: '상품 목록 조회 중\n에러가 발생하였습니다.',
  },
  COMMUNITY: {
    COMPLETE_ADD: '게시물 등록이 완료되었습니다.',
    COMPLETE_EDIT: '게시물 수정이 완료되었습니다.',
    CONFIRM_DELETE: '해당 게시물을 삭제하시겠습니까?',
    COMPLETE_DELETE: '삭제가 완료되었습니다.',
    ERROR_DELETE: '게시물 삭제 중 에러가 발생하였습니다.',
  },
  CATEGORY: {
    ERROR_GET_CATEGORY: '카테고리 조회 중\n에러가 발생하였습니다.',
    COMPLETE_ADD: '카테고리 등록이 완료되었습니다.',
    COMPLETE_EDIT: '카테고리 수정이 완료되었습니다.',
    COMPLETE_DELETE: '카테고리가 삭제되었습니다.',
    ERROR_ADD: '카테고리 등록 중\n에러가 발생하였습니다.',
    ERROR_EDIT: '카테고리 수정 중\n에러가 발생하였습니다.',
    ERROR_DELETE: '카테고리 삭제 중\n에러가 발생하였습니다.',
    ERROR_DELETE_PARENT: '하위 카테고리를\n먼저 삭제해 주세요.',
  },
  MYPAGE: {
    INFO: {
      COMPLETE_INFO: '정보 수정이 완료되었습니다.',
    },
    WISH: {
      COMPLETE_DELETE: '관심상품이 해제되었습니다.',
      ERROR_GET_WISH: '관심상품 조회 중\n에러가 발생하였습니다.',
      ERROR_DELETE_WISH: '관심상품 해제 중\n에러가 발생하였습니다.',
    },
    ORDER: {
      CONFIRM_CANCEL_ORDER: '예약을 취소하시겠습니까?',
      COMPLETE_CANCEL_ORDER: '예약 취소가 완료되었습니다.',
      ERROR_CANCEL_ORDER: '예약 취소 중\n에러가 발생하였습니다.',
    },
    WITHDRAWAL: {
      CONFIRM: '회원 탈퇴를 진행하시겠습니까?',
      COMPLETE: '회원 탈퇴가\n완료되었습니다.',
    },
  },
};
