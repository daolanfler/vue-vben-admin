import { t } from '../../../../hooks/web/useI18n';
import { LAYOUT } from '../../../constant';
import { AppRouteModule } from '../../../types';

const nexpRoutes: AppRouteModule = {
  path: '/nexp-manage',
  name: 'Nexp',
  component: LAYOUT,
  redirect: '/nexp-manage/cate',
  meta: {
    icon: 'ion:key-outline',
    title: t('routes.burnbook.nexp.menu'),
  },
  children: [
    {
      path: 'cate',
      name: 'NexpCate',
      component: () => import('/@/views/burnbook/topic/index.vue'),
      meta: {
        title: t('routes.burnbook.nexp.cate'),
      },
    },
    {
      path: 'all',
      name: 'NexpAll',
      component: () => import('/@/views/burnbook/topic/index.vue'),
      meta: {
        title: t('routes.burnbook.nexp.all'),
      },
    },
  ],
};

export default nexpRoutes;
