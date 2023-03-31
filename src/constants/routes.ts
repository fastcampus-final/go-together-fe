export const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  WELCOME: '/welcome',
  SURVEY: '/survey',
  SEARCH: '/search',
  PRODUCT: '/product',
  PRODUCT_BY_ID: (id: string) => `/product/${id}`,
  CART: '/cart',
  ORDER: '/order',
  REVIEW: '/community/review',
  REVIEW_BY_ID: (id: number) => `/community/review/${id}`,
  NOTICE: '/community/notice',
  NOTICE_BY_ID: (id: number) => `community/notice/${id}`,
  REVIEW_ADD: '/community/review/add',
  REVIEW_EDIT: '/community/review/edit',
  MYPAGE: {
    MAIN: '/mypage',
    INFO: '/mypage/info',
    WISH: '/mypage/wish',
    ORDER: '/mypage/order',
    REVIEW: '/mypage/review',
    WITHDRAWAL: '/mypage/withdrawal',
  },
  ADMIN: {
    MAIN: '/admin',
    USER: '/admin/user',
    USER_BY_ID: (id: string) => `/admin/user/${id}`,
    USER_EDIT: '/admin/user/edit',
    CATEGORY: '/admin/product/category',
    CATEGORY_BY_ID: (id: string) => `/admin/product/category/${id}`,
    CATEGORY_ADD: '/admin/product/category/add',
    CATEGORY_EDIT: '/admin/product/category/edit',
    PRODUCT: '/admin/product',
    PRODUCT_BY_ID: (id: string) => `/admin/product/${id}`,
    PRODUCT_ADD: '/admin/product/add',
    PRODUCT_EDIT: '/admin/product/edit',
    POPULAR: '/admin/product/popular',
    POPULAR_BY_ID: (id: string) => `/admin/product/popular/${id}`,
    POPULAR_ADD: '/admin/product/popular/add',
    POPULAR_EDIT: '/admin/product/popular/edit',
    ORDER: '/admin/order',
    ORDER_BY_ID: (id: string) => `/admin/order/${id}`,
    ORDER_EDIT: '/admin/order/edit',
    NOTICE: '/admin/community/notice',
    NOTICE_BY_ID: (id: string) => `/admin/community/notice/${id}`,
    NOTICE_ADD: '/admin/community/notice/add',
    NOTICE_EDIT: '/admin/community/notice/edit',
    REVIEW: '/admin/community/review',
    REVIEW_BY_ID: (id: string) => `/admin/community/review/${id}`,
    REVIEW_EDIT: '/admin/community/review/edit',
    BANNER: '/admin/banner',
    BANNER_BY_ID: (id: string) => `/admin/banner/${id}`,
    BANNER_ADD: '/admin/banner/add',
    BANNER_EDIT: '/admin/banner/edit',
  },
};
