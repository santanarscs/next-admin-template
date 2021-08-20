import Head from 'next/head'
import { useRouter } from 'next/router'
import { useAuth } from "../../data/hook/useAuth"

function WithAuth({children}) {
  const { isLoading, user } = useAuth()
  const router = useRouter()

  function renderContent() {
    return (
      <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if(!document.cookie?.includes('admin-template-auth')){
                window.location.href = '/auth'
              }
            `
          }}
        />
      </Head>
        {children}
      </>
    )
  }
  // add svg loading
  function renderLoading() {
    return (
      <div className="flex justify-center items-start h-screen">
        <h3>Loading...</h3>
      </div>
    )
  }

  if(!isLoading && user?.email) {
    return renderContent()
  } 
  
  if(isLoading) {
    return renderLoading()
  } 
    
  router.push('/auth')
  return null
  
}
export { WithAuth }