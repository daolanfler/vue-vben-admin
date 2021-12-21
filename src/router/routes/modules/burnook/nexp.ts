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
    title: t('routes.burnook.nexp.menu'),
  },
  children: [
    {
      path: 'cate',
      name: 'NexpCate',
      component: () => import('/@/views/burnook/nexp-manage/cate/index.vue'),
      meta: {
        title: t('routes.burnook.nexp.cate'),
      },
    },
    {
      path: 'all',
      name: 'NexpAll',
      component: () => import('/@/views/burnook/nexp-manage/nexp/index.vue'),
      meta: {
        title: t('routes.burnook.nexp.all'),
      },
    },
  ],
};

export default nexpRoutes;
