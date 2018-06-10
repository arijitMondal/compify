/**
 * Asynchronously loads the component for NotFoundPage
 */
import Loadable from 'react-loadable';

import Growl from 'containers/Growl';

export default Loadable({
  loader: () => import('./index'),
  loading: Growl,
});
