import { t } from '../../../../hooks/web/useI18n';
import { getParentLayout, LAYOUT } from '../../../constant';
import { AppRouteModule } from '../../../types';

const bookRoutes: AppRouteModule = {
  path: '/book',
  name: 'Book',
  component: LAYOUT,
  redirect: '/book/topic',
  meta: {
    icon: 'ion:key-outline',
    title: t('routes.burnbook.book.book'),
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
  ],
};

export default bookRoutes;
