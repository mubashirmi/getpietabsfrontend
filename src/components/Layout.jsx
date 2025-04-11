import NewNavbar from './NewNavbar'

const Layout = ({children}) => {
  return (
    <>
      <NewNavbar />
      {children}
    </>
  )
}

export default Layout
