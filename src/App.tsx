import { RouterProvider } from 'react-router-dom'
import './App.css'
import Router from './route/Router'
import { ThemeProvider } from './theme/theme-provider'
import { ToastContainer } from 'react-toastify'
import { ClipLoader } from "react-spinners";
import useSharedStore from './store/sharedStore'
import useSwal from './hooks/useSwal'
import { useEffect } from 'react'
import { BRANCH_DEPLOYED } from './constants/constants'

function App() {

  const zLoading = useSharedStore((state) => state.zLoading);
  const zError = useSharedStore((state) => state.zError);
  const zSetError = useSharedStore((state) => state.zSetError);

  const { showToast } = useSwal();

  useEffect(() => {
    document.title = "JEP";
    console.log("BRANCH_DEPLOYED: ", BRANCH_DEPLOYED);
  }, []);

  useEffect(() => {
    if (zError !== "") {
      showToast(zError, "error")
      zSetError("");
    };
  }, [zError]);
  return (
    <>
      <ToastContainer />
      {zLoading && (
        <div className="spinner-container">
          <ClipLoader size={50} color={"#123abc"} loading={zLoading} />
          {/* 
          <p className="please-wait-text">
            Please wait and will connect <br />
            you to our Customer Service Representative...
          </p> */}
        </div>
      )}
      <ThemeProvider defaultTheme="dark">
        <RouterProvider router={Router} />
      </ThemeProvider>

    </>
  )
}

export default App
