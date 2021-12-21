import { t } from '../../../../hooks/web/useI18n';
import { LAYOUT } from '../../../constant';
import { AppRouteModule } from '../../../types';

const bookRoutes: AppRouteModule = {
  path: '/book-manage',
  name: 'Book',
  component: LAYOUT,
  redirect: '/book-manage/topic',
  meta: {
    icon: 'ion:key-outline',
    title: t('routes.burnook.book.menu'),
  },
  children: [
    {
      path: 'topic',
      name: 'BookTopic',
      component: () => import('/@/views/burnook/book-manage/topic/index.vue'),
      meta: {
        title: t('routes.burnook.book.topic'),
      },
    },
    {
      path: 'books',
      name: 'BookManage',
      component: () => import('/@/views/burnook/book-manage/book/index.vue'),
      meta: {
        title: t('routes.burnook.book.book'),
      },
    },
    {
      path: ':id',
      name: 'BookItem',
      component: () => import('/@/views/burnook/book-manage/book/singleBook/index.vue'),
      meta: {
        title: t('routes.burnook.book.detail'),
        hideMenu: true,
      },
    },
  ],
};

export default bookRoutes;
