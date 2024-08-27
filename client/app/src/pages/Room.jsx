import { Header } from '../components/Header';
import Navbar from '../components/Navbar'

const Room = () => {
  const userName = "Kaneki";
  return (
    <div>
      <Navbar userName={userName} />
      <Header />
    </div>
  )
}

export default Room