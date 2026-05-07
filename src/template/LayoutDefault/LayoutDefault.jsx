import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"

function LayoutDefault({children}) {
  return(
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  )
}

export default LayoutDefault