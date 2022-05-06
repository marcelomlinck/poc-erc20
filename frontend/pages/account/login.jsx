import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { userService } from 'services';
import { toast } from 'react-toastify';
import { LockClosedIcon } from '@heroicons/react/solid'
import "react-toastify/dist/ReactToastify.css";

export default Login;

function Login() {
    const router = useRouter();

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    function onSubmit({ username, password }) {
        return userService.login(username, password)
            .then(() => {
                toast.success("Login successful!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000
                });
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            .catch(() => {
                toast.error("Login failed", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000
                })
            });
    }

    return (
        <>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://assets-global.website-files.com/61082de7b224bba038edad53/6141d452e07715f227fd1eb0_wt-logo.svg"
                alt="Willow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <a href="/account/register" className="font-medium text-willowblue hover:text-indigo-600">
                  click here to register
                </a>
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    {...register('username')}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    {...register('password')}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>  
              <div>
                <button
                  disabled={formState.isSubmitting}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-willowblue hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-600 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}
