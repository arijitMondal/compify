/**
 * Asynchronously loads the component for NotFoundPage
 */
import Loadable from 'react-loadable';

import HomePage from 'containers/HomePage';

export default Loadable({
  loader: () => import('./index'),
  loading: HomePage,
});
