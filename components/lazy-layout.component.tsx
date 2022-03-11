import dynamic from 'next/dynamic'
import Spinner from './spinner.component'

  const LazyLayout = dynamic(() =>  import('./layout.component'),
    { loading: () => <Spinner />}
  )

export default LazyLayout