import { useEffect } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AppWrapper() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const location = useLocation()


  useEffect(() => {
    const handleSSORedirect = async () => {
      try {
        const response = await instance.handleRedirectPromise();
        if (response) {
          instance.setActiveAccount(response.account);
          navigate('/upload'); // ✅ Redirect to dashboard after login
        } else if (isAuthenticated) {
          const account = instance.getActiveAccount() || instance.getAllAccounts()[0];
          if (account) {
            instance.setActiveAccount(account);
            if (location === '/') {
                navigate('/upload', { replace: true });
                console.log(window.location.pathname)
              }// ✅ Already logged in
          }
        }
      } catch (error) {
        console.error('MSAL Redirect Error:', error);
      }
    };

    handleSSORedirect();
  }, [instance, navigate, isAuthenticated]);

  return null; // Optional — or render <RouterProvider router={router} />
}
