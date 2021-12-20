import { t } from '../../../../hooks/web/useI18n';
import { getParentLayout, LAYOUT } from '../../../constant';
import { AppRouteModule } from '../../../types';

const bookRoutes: AppRouteModule = {
  path: '/book-manage',
  name: 'Book',
  component: LAYOUT,
  redirect: '/book-manage/topic',
  meta: {
    icon: 'ion:key-outline',
    title: t('routes.burnbook.book.menu'),
  },
  children: [
    {
      path: 'topic',
      name: 'BookTopic',
      component: () => import('/@/views/burnbook/topic/index.vue'),
      meta: {
        title: t('routes.burnbook.book.topic'),
      },
    },
    {
      path: 'books',
      name: 'BookManage',
      component: () => import('/@/views/burnbook/book/index.vue'),
      meta: {
        title: t('routes.burnbook.book.book'),
      },
    },
    {
      path: ':id',
      name: 'BookItem',
      component: () => import('/@/views/burnbook/book/singleBook/index.vue'),
      meta: {
        title: t('routes.burnbook.book.detail'),
        hideMenu: true,
      },
    },
  ],
};

export default bookRoutes;
