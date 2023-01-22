import Search from '@/components/search'
import { useKBar } from 'kbar'

export default function Home() {
  const { query } = useKBar()

  return (
    <div>
      <Search />
      <button onClick={query.toggle}>Search</button>
    </div>
  )
}
